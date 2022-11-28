import { InputType, OmitType } from '@nestjs/graphql';
import { Report } from '../entities/report.entity';

@InputType()
export class CreateReportInput extends OmitType(Report, [
  'id',
  'reporterId',
] as const) {}
