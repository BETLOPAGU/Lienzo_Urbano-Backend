import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/s3.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, S3Service],
  imports: [NotificationsModule],
  exports: [UsersService],
})
export class UsersModule {}
