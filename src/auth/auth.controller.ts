import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { SigninUserDto } from './dtos/auth_signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAll() {
    return this.authService.getAll();
  }
  @Post()
  addUser(@Body() body: CreateUserDto) {
    return this.authService.addUser(body);
  }
  @Post('local/signin')
  signinLocal(@Body() body: SigninUserDto) {
    return this.authService.signinLocal(body);
  }
}
