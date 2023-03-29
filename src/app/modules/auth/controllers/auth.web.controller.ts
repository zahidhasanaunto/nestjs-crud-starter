import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDTO, SendOtpDTO, VerifyOtpDTO } from '../dtos';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('web/auth')
export class WebAuthController {
  constructor(private readonly service: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body() body: SendOtpDTO) {
    return this.service.sendOtp(body);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDTO) {
    return this.service.verifyOtp(body);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDTO) {
    return this.service.refreshToken(body);
  }
}
