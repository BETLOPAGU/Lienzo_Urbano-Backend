import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReportInput } from './dto/create-report.input';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    reporterId: number,
    createReportInput: CreateReportInput,
  ): Promise<Report> {
    const { userId, artworkId, commentId } = createReportInput;
    return this.prisma.reports.create({
      data: {
        createdDate: new Date(),
        reporterId,
        description: createReportInput.description,
        ...(userId ? { userId } : {}),
        ...(artworkId ? { artworkId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });
  }

  async findAll(payload: {
    userId?: number;
    artworkId?: number;
    commentId?: number;
  }): Promise<Report[]> {
    const { userId, artworkId, commentId } = payload;
    return this.prisma.reports.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(artworkId ? { artworkId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });
  }

  async update(id: number, description: string): Promise<Report> {
    return this.prisma.reports.update({ where: { id }, data: { description } });
  }

  async remove(id: number): Promise<Report> {
    return this.prisma.reports.delete({ where: { id } });
  }
}
