import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  addUser(
    @Body('email')
    email: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('roles') roles: string[],
  ) {
    return this.usersService.addUser(email, password, name, roles);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
