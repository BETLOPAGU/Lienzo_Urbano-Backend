import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
export declare class ReportsResolver {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    createReport(jwt: JwtPayload, createReportInput: CreateReportInput): Promise<Report>;
    findAll(userId?: number, artworkId?: number, commentId?: number): Promise<Report[]>;
    updateReport(id: number, description: string): Promise<Report>;
    removeReport(id: number): Promise<Report>;
}
