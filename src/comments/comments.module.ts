import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PrismaService } from 'src/prisma.service';
import { PubsubModule } from 'src/pubsub/pubsub.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  providers: [CommentsResolver, CommentsService, PrismaService],
  exports: [CommentsService],
  imports: [PubsubModule, NotificationsModule],
})
export class CommentsModule {}
