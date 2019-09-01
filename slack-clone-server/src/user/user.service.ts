import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository, EntityManager, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getManager } from 'typeorm';
import { ValidationError} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorHandler } from '../common/error/errorHandler';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly errorHandler: ErrorHandler
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

  
}
