import { NotFoundException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Team } from '../graphql.schema';
import { TeamService } from './team.service';

@Resolver('Team')
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService) {
  }

  @Mutation()
  async createTeam(@Args() args) {
     
    try { 
      await this.teamService.create({
        ...args,
        owner: 1 // TODO: infer from JWT
      });
      return true;
    } catch (err) {
      Logger.error(err);
      return false;
    }  
  }
} 