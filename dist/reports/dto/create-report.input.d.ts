import { Report } from '../entities/report.entity';
declare const CreateReportInput_base: import("@nestjs/common").Type<Omit<Report, "id" | "reporterId">>;
export declare class CreateReportInput extends CreateReportInput_base {
}
export {};
