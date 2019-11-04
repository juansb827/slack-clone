import { NotFoundException, Logger, UseGuards, NestInterceptor, CallHandler, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Context, Root, Info, Parent } from '@nestjs/graphql';

import { Team, CreateTeamInput } from '../graphql.schema';
import { TeamService } from './team.service';
import { ErrorHandler } from '../common/error/errorHandler';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { tap, mapTo } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {
   canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { req, res } = ctx;
    res.set('Access-Control-Expose-Headers', 'x-token');
    res.set('x-token', 'adfakfjlkdafjlaskj');
    res.set('x-refresh-token', '232adfakfjlkdafjlaskj');
    throw {
      ok: false,
      errors: [{
        path: 'dsada',
        message: 'dsdad'}
      ]
      
    };
    return true;
  }
}
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

