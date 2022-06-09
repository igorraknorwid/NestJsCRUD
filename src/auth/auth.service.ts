import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { SigninUserDto } from './dtos/auth_signin.dto';
import { CreateUserDto } from './dtos/create_user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private JwtSerwice: JwtService,
  ) {}

  getAll() {
    return this.repo.find();
  }

  async addUser(body: CreateUserDto) {
    const newUser = await this.repo.create({ ...body });
    return this.repo.save(newUser);
  }

  async signinLocal(body: SigninUserDto) {
    const users = await this.getAll();
    const user = users.find((user) => user.email === body.email);
    if (!user) throw new UnauthorizedException('Credentials incorrect email');
    if (user.password !== body.password)
      throw new UnauthorizedException('Credentials incorrect password');
    return this.signUser(user.id, user.email, user.type);
  }

  signUser(userId: number, email: string, type: string) {
    return this.JwtSerwice.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
}
