import { NotFoundException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Channel } from '../graphql.schema';
import { ChannelService } from './channel.service';

@Resolver('Channel')
export class ChannelResolver {
  constructor(
    private readonly channelService: ChannelService) {
  }

  @Mutation()
  async createChannel(@Args() args) {
     
    try { 
      await this.channelService.create({
        ...args,
      });
      return true;
    } catch (err) {
      Logger.error(err);
      return false;
    }  
  }
} 