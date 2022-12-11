import { PrismaService } from 'src/prisma.service';
import { CreateReportInput } from './dto/create-report.input';
import { Report } from './entities/report.entity';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(reporterId: number, createReportInput: CreateReportInput): Promise<Report>;
    findAll(payload: {
        userId?: number;
        artworkId?: number;
        commentId?: number;
    }): Promise<Report[]>;
    update(id: number, description: string): Promise<Report>;
    remove(id: number): Promise<Report>;
}
