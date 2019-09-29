import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { User, RegisterResponse, LoginResponse, LoginInput } from '../graphql.schema';
import { UserService } from './user.service';
import { ErrorHandler } from '../common/error/errorHandler';
import { LoginDto } from './dto/login.dto';
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly errorHandler: ErrorHandler) {}

  @Query()
  async getUser(@Args('id') id: number) {
    return await this.userService.findOneById(id);
  }

  @Query(returns => [User])
  async allUsers() {
    return await this.userService.findAll();
  }

  @Mutation()
  async login(@Args('loginInput') args: LoginDto): Promise<LoginResponse> {
    try {
      const userLogin: any = await this.userService.login(args.email, args.password);
      return {
        ok: true,
          token: userLogin.token,
          refreshToken: userLogin.refreshToken
      };
    } catch (err) {
      return {
        ok: false,
        errors: this.errorHandler.formatError(err)
      };
    }
  }

  @Mutation()
  async register(@Args() args: User): Promise<RegisterResponse> {
    try {
      const user: any = await this.userService.create(<any>args);
      Logger.log(user)
      return {
        ok: true,
        user
      };
    } catch (err) {
      Logger.error(JSON.stringify(err));
      return {
        ok: false,
        errors: this.errorHandler.formatError(err)
      };
    }
  }
}
