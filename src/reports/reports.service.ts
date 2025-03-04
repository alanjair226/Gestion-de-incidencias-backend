import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidence } from 'src/incidences/entities/incidence.entity';
import { Period } from 'src/periods/entities/period.entity';
import { Score } from 'src/scores/entities/score.entity';
import { User } from 'src/users/entities/user.entity';
import { validate } from 'src/common/utils/validations.utils';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Incidence)
    private readonly incidenceRepository: Repository<Incidence>,
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>,
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createIncidencesReport(periodId: number): Promise<Buffer> {
    // 1. Validar que el período exista
    const period: Period = await validate(periodId, 'id', this.periodRepository);
    if (!period) {
      throw new BadRequestException(`Período con ID ${periodId} no encontrado`);
    }

    // 2. Obtener incidencias del período
    const incidences: Incidence[] = await this.incidenceRepository.find({
      where: { period },
      order: { created_at: 'DESC' },
    });

    // 3. Agrupar incidencias por usuario asignado
    const incidencesByUser: Map<number, Incidence[]> = new Map();
    incidences.forEach((inc) => {
      const userId = inc.assigned_to.id;
      if (!incidencesByUser.has(userId)) {
        incidencesByUser.set(userId, []);
      }
      incidencesByUser.get(userId).push(inc);
    });

    // 4. Crear el workbook de Excel
    const workbook = new ExcelJS.Workbook();

    // ===========================
    // HOJA RESUMEN
    // ===========================
    const summarySheet = workbook.addWorksheet('Resumen');

    // Título principal
    summarySheet.mergeCells('A1', 'D1');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = 'Reporte de Incidencias';
    titleCell.font = { bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center' };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFC000' }, // Fondo dorado
    };
    summarySheet.getRow(1).height = 25;

    summarySheet.addRow([]);
    summarySheet.addRow(['Período ID:', period.id]);
    summarySheet.addRow([
      'Fecha de inicio:',
      period.start_date ? period.start_date.toISOString() : '',
    ]);
    summarySheet.addRow([
      'Fecha de fin:',
      period.end_date ? period.end_date.toISOString() : '',
    ]);

    // Ajustar ancho de columnas en la hoja de resumen
    summarySheet.getColumn(1).width = 20;
    summarySheet.getColumn(2).width = 30;

    // ===========================
    // HOJAS POR USUARIO
    // ===========================
    for (const [userId, userIncidences] of incidencesByUser.entries()) {
      // Obtener datos del usuario y su calificación
      const user = userIncidences[0].assigned_to;
      const scoreObj = await this.scoreRepository.findOne({
        where: { user, period },
      });
      const score = scoreObj ? scoreObj.score : 0;

      // Crear la hoja con el nombre del usuario
      const sheetName = user.username
        ? user.username.substring(0, 30)
        : `User-${userId}`;
      const userSheet = workbook.addWorksheet(sheetName);

      // Encabezado principal (username y Calificación)
      userSheet.mergeCells('A1', 'E1');
      const userTitleCell = userSheet.getCell('A1');
      userTitleCell.value = `${user.username} | Calificación: ${score}`;
      userTitleCell.font = { bold: true, size: 14 };
      userTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      userTitleCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF4B084' }, // Naranja claro
      };
      userSheet.getRow(1).height = 20;

      userSheet.addRow([]);

      // Encabezados de columna
      const headerRow = userSheet.addRow([
        'ID',
        'Descripción',
        'Fecha de Creación',
        'Severidad',
        'Válida',
      ]);

      // Estilos para la fila de encabezados
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // Texto blanco
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF5B9BD5' }, // Azul
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      // Ajustar ancho de columnas
      userSheet.getColumn(1).width = 8;   // ID
      userSheet.getColumn(2).width = 60;  // Descripción
      userSheet.getColumn(3).width = 20;  // Fecha
      userSheet.getColumn(4).width = 15;  // Severidad
      userSheet.getColumn(5).width = 10;  // Válida

      // Ordenar incidencias: válidas primero
      const validIncidences = userIncidences.filter((inc) => inc.valid);
      const invalidIncidences = userIncidences.filter((inc) => !inc.valid);
      const sortedIncidences = [...validIncidences, ...invalidIncidences];

      // Alineación de los encabezados (ID, Fecha, Severidad, Válida -> centrados; Descripción -> izquierda)
      headerRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
      headerRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };
      headerRow.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
      headerRow.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
      headerRow.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };

      // Agregar cada incidencia
      sortedIncidences.forEach((inc) => {
        // Convertir la fecha a Date para formatearla
        const createdAtDate = new Date(inc.created_at);

        const row = userSheet.addRow([
          inc.id,
          inc.description || '',
          createdAtDate,
          inc.severity.name,
          inc.valid ? 'Sí' : 'No',
        ]);

        // Bordes en todas las celdas
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });

        // Alineación de cada columna
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(2).alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
        row.getCell(3).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(5).alignment = { horizontal: 'center', vertical: 'top' };

        // Formato de fecha dd/mm/yyyy hh:mm
        row.getCell(3).numFmt = 'dd/mm/yyyy hh:mm';

        // Ajustar manualmente la altura de la fila según la longitud de la descripción
        const description = inc.description || '';
        const approxLines = Math.ceil(description.length / 50);
        const rowHeight = approxLines * 15;
        if (rowHeight > 15) {
          row.height = rowHeight;
        }

        // Color condicional para la severidad (ejemplo)
        const severityCell = row.getCell(4);
        const severityName = inc.severity.name.toLowerCase();
        if (severityName.includes('grave')) {
          severityCell.font = { color: { argb: 'FFFF0000' }, bold: true };
        } else if (severityName.includes('moderada')) {
          severityCell.font = { color: { argb: 'FF1F4E78' }, bold: true };
        }
      });
    }

    // 5. Convertir a buffer y retornar
    const rawBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(rawBuffer);
  }
}
