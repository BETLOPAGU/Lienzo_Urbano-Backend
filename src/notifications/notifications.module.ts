import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { PrismaService } from 'src/prisma.service';
import { PubsubModule } from 'src/pubsub/pubsub.module';

@Module({
  providers: [NotificationsResolver, NotificationsService, PrismaService],
  imports: [PubsubModule],
  exports: [NotificationsService],
})
export class NotificationsModule {}
