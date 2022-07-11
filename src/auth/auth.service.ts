import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByUsername(username);
    if (user && user.password === pass) {
      //pass needs to be hashed
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    //const payload = { username: user.username, sub: user.userId };
    const payload = { username: user.username, sub: 7 };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
