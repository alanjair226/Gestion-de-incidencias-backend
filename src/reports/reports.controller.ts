import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('')
  helloWorld(){
    return {message : "hello world"}
  }

  @Get('incidences/:periodid')
async createIncidencesReport(
  @Param('periodid') periodid: number,
  @Res() res: Response,
) {
  const buffer = await this.reportsService.createIncidencesReport(periodid);
  res.set({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': `attachment; filename="incidences-report.xlsx"`,
  });
  res.end(buffer);
}
}
