import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ArtworksModule } from 'src/artworks/artworks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ArtworksModule, UsersModule],
})
export class SeedModule {}
