import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { Repository, EntityManager, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getManager } from 'typeorm';
import { ValidationError} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorHandler } from '../common/error/errorHandler';
import { ClientError } from '../common/error/error.interfaces';
import jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly errorHandler: ErrorHandler,
    private readonly configService: ConfigService
  ) {}

  async create(user: User): Promise<User> {
    const userInstance: User = plainToClass(User, user);
    const errors = await validate(userInstance);
    this.errorHandler.checkForValidationErrors(errors);
    userInstance.password = await bcrypt.hash(user.password, 12);
    const newUser = await this.entityManager.save(userInstance);
    delete newUser.password;
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      email
    });

    if (!user) {
      throw new ClientError([{ path: 'email', message: 'Invalid Login'}]);
    }
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      throw new ClientError([{ path: 'email', message: 'Invalid Loginn'}]);  
    }

    const [secret, secret2] = this.configService.getSecrets();
    const refreshTokenSecret = user.password + secret2;
    const [token, refreshToken] = await createTokens(user, secret, refreshTokenSecret); 
    return {
      token,
      refreshToken
    }

  }

  
}

export const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user:  { id: user.id }
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: { id: user.id }
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};
