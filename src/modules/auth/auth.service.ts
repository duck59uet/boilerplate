import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RoleType } from '../../constants';
import { Web3LoginDTO } from './dto/web3-login.dto';
import { isValidUserSignature } from '../../decorators/wallet.decorators';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  async userGetNonce(addr: string): Promise<number> {
    const nonce = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;

    let user = await this.userRepo.getUserByAddress(addr.toString());
    if (user === null) {
      user = await this.userRepo.initUser(addr.toString(), nonce);
    }

    // update user's nonce
    await this.userRepo.updateUserNonce(user, nonce);
    return nonce;
  }

  async userLogIn(loginDTO: Web3LoginDTO): Promise<string> {
    const { addr, massage, signature, publicKey } = loginDTO;

    if (!isValidUserSignature(addr, massage, signature, publicKey)) {
      throw new UnauthorizedException('Invalid Signature');
    }

    const user = await this.userRepo.getUserByAddress(addr);
    if (user === null) {
      throw new BadRequestException('User not found');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      role: RoleType.USER,
      address: addr
    });
    return accessToken;
  }
}
