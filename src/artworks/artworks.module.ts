import { Module } from '@nestjs/common';
import { ArtworksService } from './artworks.service';
import { ArtworksResolver } from './artworks.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ArtworksResolver, ArtworksService, PrismaService],
  exports: [ArtworksService],
})
export class ArtworksModule {}
