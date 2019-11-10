import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

import { GqlExecutionContext } from "@nestjs/graphql";
import { ConfigService } from "../../config/config.service";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { refreshTokens } from "./auth.utils";
import { UserService } from "../../user/user.service";
import { AuthToken } from "./auth.interfaces";
import { GqlContext } from "../graphql/graphql.interfaces";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private configService: ConfigService,
    private userService: UserService) { } 

  async canActivate(context: ExecutionContext) {
    const ctx: GqlContext = GqlExecutionContext.create(context).getContext();
    const { req, res } = ctx;
    const accessToken: string = req.headers['x-token'];
    const refreshToken: string = req.headers['x-refresh-token'];

    const error = {
      ok: false,
      errors: [{
        path: 'auth',
        message: 'invalid session token'
      }
      ]
    };

    const [secret, secret2] = this.configService.getSecrets();

    try {
      const token: AuthToken = <AuthToken>jwt.verify(accessToken, secret);
      ctx.user = token.user;
      return true;
    } catch (err) {
      if (!(err instanceof TokenExpiredError)) {
        throw error;
      }
    }

    try {
      const { user, token: newToken } = await refreshTokens(
        refreshToken,
        secret,
        secret2,
        this.userService
        );
      ctx.user = user;
      res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
      res.set('x-token', newToken);
      res.set('x-refresh-token', refreshToken);

      return true;
    } catch (err) {
      throw error;
    }
  }




}

