import { NotFoundException, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Message } from '../graphql.schema';
import { MessageService } from './message.service';

@Resolver('Message')
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService) {
  }

  @Mutation()
  async createMessage(@Args() args) {
     
    try { 
      await this.messageService.create({
        ...args,
        user: 1 // TODO: TODO Infer from JWT 
      });
      return true;
    } catch (err) {
      Logger.error(err);
      return false;
    }  
  }
} 