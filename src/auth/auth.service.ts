import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    delete user.password;
    const payload = {
      ...user,
    };
    // instead of the user object
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
