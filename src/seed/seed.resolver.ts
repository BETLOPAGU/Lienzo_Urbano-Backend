import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, { description: 'Method to auto generate test data' })
  runSeed() {
    return this.seedService.populateDB();
  }
}
