import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
//import { User } from './models/User';
import { Logger } from '@nestjs/common';

import { User } from '../graphql.schema';

@Resolver('User')
export class UsersResolver {
  constructor() {
    Logger.error('DSADADSAD');
  }

  @Query(returns => [User])
  Users(): Promise<User[]> {
    Logger.warn('asdakdlasd');
    return Promise.resolve([{ hi:'sdad'}] as any);
  }



  
}
