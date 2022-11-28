import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ReportsResolver, ReportsService, PrismaService],
  exports: [ReportsService],
})
export class ReportsModule {}
