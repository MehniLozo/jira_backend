import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
//import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserloginRequestDto } from './user/dto/user-login.req.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserloginRequestDto) {
    return this.authService.login(user);
  }
}
