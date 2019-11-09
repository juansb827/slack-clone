import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, RegisterResponse, LoginResponse, RegisterInput } from '../graphql.schema';
import { UserService } from './user.service';
import { ErrorHandler } from '../common/error/errorHandler';
import { LoginDto } from './dto/login.dto';

@Resolver('User')

export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly errorHandler: ErrorHandler) { }

  @Query()
  async getUser(@Args('id') id: number) {
    return await this.userService.findOneById(''+id);
  }

  @Query(returns => [User])
  async allUsers() {
    return await this.userService.findAll();
  }

  @Mutation()
  async login(@Args('input') args: LoginDto): Promise<LoginResponse> {
    try {
      const userLogin: any = await this.userService.login(args);
      return {
        ok: true,
        token: userLogin.token,
        refreshToken: userLogin.refreshToken
      };
    } catch (err) {
      return this.errorHandler.createErrorResponse(err);
    }
  }

  @Mutation()
  async register(@Args('input') args: RegisterInput): Promise<RegisterResponse> {
    try {
      const user: any = await this.userService.create(args);
      return {
        ok: true,
        user
      };
    } catch (err) {
      return this.errorHandler.createErrorResponse(err);
    }
  }
}
