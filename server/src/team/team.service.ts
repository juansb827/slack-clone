import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { Team } from './team.entity';
import { ErrorHandler } from '../common/error/errorHandler';

@Injectable()
export class TeamService {

  constructor(
    @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        private readonly errorHandler: ErrorHandler
  ) {    
  }  
  
  async create(team: Team): Promise<Team> {
    const teamInstance: Team = plainToClass(Team, team);
    const errors = await validate(teamInstance);
    this.errorHandler.checkForValidationErrors(errors);
    return this.teamRepository.save(teamInstance);
  }
}