import { Body, Param, Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_CONSTANTS } from '../../common/constants/api.constant';
import { AuthService } from './auth.service';
import { Web3LoginDTO } from './dto/web3-login.dto';

@Controller(CONTROLLER_CONSTANTS.AUTH)
@ApiTags(CONTROLLER_CONSTANTS.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce/:addr')
  @ApiOperation({
    summary: 'Get nonce',
  })
  @HttpCode(HttpStatus.OK)
  async getNonce(@Param('addr') addr: string): Promise<{ nonce: number }> {
    return { nonce: await this.authService.userGetNonce(addr.trim()) };
  }

  @Post('user/login')
  @ApiOperation({
    summary: 'Send signature to create access token',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: Web3LoginDTO): Promise<{ token: string }> {
    const token = await this.authService.userLogIn(loginDTO);
    return { token };
  }
}
