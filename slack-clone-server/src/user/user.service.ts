import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository, EntityManager } from 'typeorm';
import { getManager } from 'typeorm';
import { validate } from 'class-validator';

import { Logger } from '@nestjs/common';
import { User } from './user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(user: User): Promise<User> {
    const userInstance = new User();
    userInstance.email = user.email;
    userInstance.password = await bcrypt.hash(user.password, 12);
    userInstance.username = user.username;
    Logger.error('sdada')
    try {
      const errors = await validate(userInstance);
    }
    catch (err) {
      Logger.error(`sdada233a${err.length}`)
    }
    return;
    return this.entityManager.save(userInstance);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
