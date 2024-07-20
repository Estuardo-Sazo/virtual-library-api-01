import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() singIn: Record<string, any>) {
    return this.authService.login(singIn.email, singIn.password);
  }
}
