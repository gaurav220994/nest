import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public, Role, Roles } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Roles(Role.Admin, Role.User)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
