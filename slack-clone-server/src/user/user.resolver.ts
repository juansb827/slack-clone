import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Logger } from '@nestjs/common';

import { User } from '../graphql.schema';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  async getUser(@Args('id') id: number) {
    return await this.userService.findOneById(id);
  }

  @Query(returns => [User])
  async allUsers() {
    return await this.userService.findAll();
  }

  @Mutation()
  async register(@Args() args: User) {
    Logger.log(args);
    try {
      await this.userService.create(<any>args);
      return true;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
