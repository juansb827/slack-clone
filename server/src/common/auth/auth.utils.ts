import { AuthToken } from "./auth.interfaces";
import jwt from 'jsonwebtoken';
import { UserService } from "../../user/user.service";
import { User } from "src/user/user.entity";

export const refreshTokens = async (
  refreshToken: string,
  secret: string,
  secret2: string,
  userService: UserService) => {
  const decoded: AuthToken = <AuthToken>jwt.decode(refreshToken);
  const userId = decoded.user.id;
  if (!userId) throw new Error('Token contains no user id');

  const user = await userService.findOneById(userId);
  if (!user) throw new Error('No user found');

  const refreshSecret = user.password + secret2;

  jwt.verify(refreshToken, refreshSecret);

  const newToken = jwt.sign({
    user: { id: user.id }
  },
    secret, {
    expiresIn: '1s',
  },
  );

  return {
    user: { id: user.id },
    token: newToken
  }
}

export const createTokens = (user: User, secret, secret2) => {
  const token: string = jwt.sign(
    {
      user: { id: user.id }
    },
    secret,
    {
      expiresIn: '1s',
    },
  );
  // Makes refresh token invalid when user changes password
  const refreshTokenSecret = user.password + secret2;
  const refreshToken: string = jwt.sign(
    {
      user: { id: user.id }
    },
    refreshTokenSecret,
    {
      expiresIn: '7d',
    },
  );

  return {
    user: { id: user.id },
    token,
    refreshToken
  };
};