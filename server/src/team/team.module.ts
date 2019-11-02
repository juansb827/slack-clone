import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    providers: [TeamResolver, TeamService],
})
export class TeamModule {}
