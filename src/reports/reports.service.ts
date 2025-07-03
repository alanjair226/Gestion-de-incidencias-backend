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
    const period: Period = await validate(periodId, 'id', this.periodRepository);
    if (!period) {
      throw new BadRequestException(`Period with ID ${periodId} not found`);
    }

    // Load incidences, ensuring 'assigned_to' relation is eager loaded
    const incidences: Incidence[] = await this.incidenceRepository.find({
      where: { period },
      order: { created_at: 'DESC' },
      relations: ['assigned_to'],
    });

    const incidencesByUser: Map<number, Incidence[]> = new Map();
    incidences.forEach((inc) => {
      // Skip incidences without an assigned user (e.g., due to soft-deletes or data inconsistencies)
      if (!inc.assigned_to) {
        console.warn(`Incidence ID ${inc.id} has no assigned user and will be skipped.`);
        return;
      }

      const userId = inc.assigned_to.id;
      if (!incidencesByUser.has(userId)) {
        incidencesByUser.set(userId, []);
      }
      incidencesByUser.get(userId).push(inc);
    });

    const workbook = new ExcelJS.Workbook();

    // Summary Sheet
    const summarySheet = workbook.addWorksheet('Summary');
    summarySheet.mergeCells('A1', 'D1');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = 'Incidence Report';
    titleCell.font = { bold: true, size: 16 };
    titleCell.alignment = { horizontal: 'center' };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC000' } };
    summarySheet.getRow(1).height = 25;

    summarySheet.addRow([]);
    summarySheet.addRow(['Period ID:', period.id]);
    summarySheet.addRow(['Start Date:', period.start_date ? period.start_date.toISOString() : '']);
    summarySheet.addRow(['End Date:', period.end_date ? period.end_date.toISOString() : '']);

    summarySheet.getColumn(1).width = 20;
    summarySheet.getColumn(2).width = 30;

    // Sheets per User
    for (const [userId, userIncidences] of incidencesByUser.entries()) {
      const user = userIncidences[0].assigned_to;
      const scoreObj = await this.scoreRepository.findOne({ where: { user, period } });
      const score = scoreObj ? scoreObj.score : 0;

      const sheetName = user.username ? user.username.substring(0, 30) : `User-${userId}`;
      const userSheet = workbook.addWorksheet(sheetName);

      userSheet.mergeCells('A1', 'E1');
      const userTitleCell = userSheet.getCell('A1');
      userTitleCell.value = `${user.username} | Score: ${score}`;
      userTitleCell.font = { bold: true, size: 14 };
      userTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      userTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4B084' } };
      userSheet.getRow(1).height = 20;

      userSheet.addRow([]);

      const headerRow = userSheet.addRow([
        'ID',
        'Description',
        'Creation Date',
        'Severity',
        'Valid',
      ]);

      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B9BD5' } };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });

      userSheet.getColumn(1).width = 8;
      userSheet.getColumn(2).width = 60;
      userSheet.getColumn(3).width = 20;
      userSheet.getColumn(4).width = 15;
      userSheet.getColumn(5).width = 10;

      const validIncidences = userIncidences.filter((inc) => inc.valid);
      const invalidIncidences = userIncidences.filter((inc) => !inc.valid);
      const sortedIncidences = [...validIncidences, ...invalidIncidences];

      headerRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
      headerRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };
      headerRow.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
      headerRow.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
      headerRow.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };

      sortedIncidences.forEach((inc) => {
        const createdAtDate = new Date(inc.created_at);

        const row = userSheet.addRow([
          inc.id,
          inc.description || '',
          createdAtDate,
          inc.severity.name,
          inc.valid ? 'Yes' : 'No',
        ]);

        row.eachCell((cell) => {
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });

        row.getCell(1).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(2).alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
        row.getCell(3).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'top' };
        row.getCell(5).alignment = { horizontal: 'center', vertical: 'top' };

        row.getCell(3).numFmt = 'dd/mm/yyyy hh:mm';

        const description = inc.description || '';
        const approxLines = Math.ceil(description.length / 50);
        const rowHeight = approxLines * 15;
        if (rowHeight > 15) {
          row.height = rowHeight;
        }

        const severityCell = row.getCell(4);
        const severityName = inc.severity.name.toLowerCase();
        if (severityName.includes('grave')) {
          severityCell.font = { color: { argb: 'FFFF0000' }, bold: true };
        } else if (severityName.includes('moderada')) {
          severityCell.font = { color: { argb: 'FF1F4E78' }, bold: true };
        }
      });
    }

    const rawBuffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(rawBuffer);
  }
}