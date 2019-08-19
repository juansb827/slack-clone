import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Channel])],
    providers: [ChannelService, ChannelResolver]
})
export class ChannelModule {}
