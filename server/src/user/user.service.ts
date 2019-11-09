import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';
import { Repository, EntityManager } from 'typeorm';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorHandler } from '../common/error/errorHandler';
import { ClientError } from '../common/error/error.interfaces';
import { ConfigService } from '../config/config.service';
import { LoginDto } from './dto/login.dto';
import { RegisterInput } from 'src/graphql.schema';
import { createTokens } from '../common/auth/auth.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly errorHandler: ErrorHandler,
    private readonly configService: ConfigService
  ) {}

  async create(registerInput: RegisterInput): Promise<User> {
    const userInstance: User = plainToClass(User, registerInput);
    const errors = await validate(userInstance);
    this.errorHandler.checkForValidationErrors(errors);
    userInstance.password = await bcrypt.hash(userInstance.password, 12);
    const newUser = await this.entityManager.save(userInstance);
    delete newUser.password;
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async login(loginDto: LoginDto) {
    const loginInstance: LoginDto = plainToClass(LoginDto, loginDto);
    const errors = await validate(loginInstance);
    this.errorHandler.checkForValidationErrors(errors);
    const { email, password} = loginInstance;

    const user: User = await this.userRepository.findOne({
      email
    });

    if (!user) {
      throw new ClientError([{ path: 'credentials', message: 'Invalid Credentials'}]);
    }
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
      throw new ClientError([{ path: 'credentials', message: 'Invalid Credentials'}]);  
    }

    const [secret, secret2] = this.configService.getSecrets();
    // user can no longer refresh if it changes password
    const {token, refreshToken} = await createTokens(user, secret, secret2); 
    return {
      token,
      refreshToken
    }
  }

  
}


