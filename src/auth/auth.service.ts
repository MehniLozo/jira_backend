import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getByUsername(username);
    const auth = await bcrypt.compare(pass, user.password);
    if (user && auth) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId};
    const access_token = this.jwtService.sign(payload);
    const userCache = await this.userService.getByUsername(user.username);
    await this.cacheManager.set(access_token, userCache , { ttl : 1661521172});
    return {
      access_token,
    };
  }
}
