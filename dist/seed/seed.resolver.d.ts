import { SeedService } from './seed.service';
export declare class SeedResolver {
    private readonly seedService;
    constructor(seedService: SeedService);
    runSeed(): Promise<boolean>;
    resetDataFromDB(): Promise<boolean>;
}
