import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {    
  }  
  
  async create(user: User): Promise<User> {
    const hashedPassword =  await bcrypt.hash(user.password , 12);
    return await this.userRepository.save({
      ...user,
      password: hashedPassword
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
}