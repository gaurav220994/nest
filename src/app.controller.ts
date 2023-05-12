import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/constants';
import { CreateUserDto } from './app.validation';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): { msg: string } {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
