import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username }) || null;
  }

  async create(username: string, password: string): Promise<void> {
    const user = this.usersRepository.create({
      username,
      password,
    });

    await this.usersRepository.save(user);
  }
}
