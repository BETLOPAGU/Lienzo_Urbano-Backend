import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [EventsResolver, EventsService, PrismaService],
})
export class EventsModule {}
