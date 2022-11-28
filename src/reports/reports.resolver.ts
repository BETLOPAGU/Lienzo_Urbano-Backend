import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Mutation(() => Report)
  createReport(
    @Jwt() jwt: JwtPayload,
    @Args('createReportInput') createReportInput: CreateReportInput,
  ) {
    return this.reportsService.create(jwt.userId, createReportInput);
  }

  @Query(() => [Report], { name: 'reports' })
  findAll(
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
    @Args('artworkId', { type: () => Int, nullable: true }) artworkId?: number,
    @Args('commentId', { type: () => Int, nullable: true }) commentId?: number,
  ) {
    return this.reportsService.findAll({ userId, artworkId, commentId });
  }

  @Mutation(() => Report)
  updateReport(
    @Args('id', { type: () => Int }) id: number,
    @Args('description') description: string,
  ) {
    return this.reportsService.update(id, description);
  }

  @Mutation(() => Report)
  removeReport(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.remove(id);
  }
}
