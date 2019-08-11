import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
//import { Recipe } from './models/recipe';
import { Logger } from '@nestjs/common';

import { Recipe } from '../graphql.schema';

@Resolver('Recipe')
export class RecipesResolver {
  constructor() {
    Logger.error('DSADADSAD');
  }

  @Query(returns => [Recipe])
  recipes(): Promise<Recipe[]> {
    Logger.warn('asdakdlasd');
    return Promise.resolve([{ hi:'sdad'}] as any);
  }



  
}
