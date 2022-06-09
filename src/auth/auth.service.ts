import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { CreateUserDto } from './dtos/create_user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async addUser(body: CreateUserDto) {
    const newUser = await this.repo.create({ ...body });
    return this.repo.save(newUser);
  }
}
