import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ArtworksModule } from 'src/artworks/artworks.module';
import { UsersModule } from 'src/users/users.module';
import { CollectionsModule } from '../collections/collections.module';
import { CommentsModule } from '../comments/comments.module';
import { ReportsModule } from '../reports/reports.module';
import { PrismaService } from 'src/prisma.service';
import { RedisService } from 'src/redis.service';

@Module({
  providers: [SeedResolver, SeedService, PrismaService, RedisService],
  imports: [
    ArtworksModule,
    UsersModule,
    CollectionsModule,
    CommentsModule,
    ReportsModule,
  ],
})
export class SeedModule {}
