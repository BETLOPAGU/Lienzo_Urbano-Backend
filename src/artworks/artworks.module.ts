import { Module } from '@nestjs/common';
import { ArtworksService } from './artworks.service';
import { ArtworksResolver } from './artworks.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/s3.service';
import { RedisService } from 'src/redis.service';

@Module({
  providers: [
    ArtworksResolver,
    ArtworksService,
    PrismaService,
    S3Service,
    RedisService,
  ],
  exports: [ArtworksService],
})
export class ArtworksModule {}
