import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';

import { CreateTeamInput } from '../graphql.schema';
import { TeamService } from './team.service';
import { ErrorHandler } from '../common/error/errorHandler';
import { AuthGuard } from '../common/auth/auth.guard';
import { GqlContext } from '../common/graphql/graphql.interfaces';

@Resolver('Team')
@UseGuards(AuthGuard)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly errorHandler: ErrorHandler) {
  }

  @Mutation()
  async createTeam(@Args('input') args: CreateTeamInput, @Context() context: GqlContext) {
    try {
      await this.teamService.create(<any>{
        ...args,
        owner: context.user.id
      });
      return {
        ok: true
      };
    } catch (err) {
      return this.errorHandler.createErrorResponse(err);
    }
  }

}

