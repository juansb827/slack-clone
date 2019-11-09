import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';

import { CreateTeamInput } from '../graphql.schema';
import { TeamService } from './team.service';
import { ErrorHandler } from '../common/error/errorHandler';
import { AuthGuard } from '../common/auth/auth.guard';

@Resolver('Team')
@UseGuards(AuthGuard)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly errorHandler: ErrorHandler) {
  }

  @Mutation()
  async createTeam(@Args('input') args: CreateTeamInput, @Context() context) {
    //console.log('Ctx', JSON.stringify(context.req.headers)); 
    try {
      await this.teamService.create(<any>{
        ...args,
        owner: 1 // TODO: infer from JWT
      });
      return {
        ok: true
      };
    } catch (err) {
      return this.errorHandler.createErrorResponse(err);
    }
  }

}

