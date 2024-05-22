import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RoleType } from '../../constants';
import { Web3LoginDTO } from './dto/web3-login.dto';
import { isValidUserSignature, standardizeAddress } from '../../decorators/wallet.decorators';
import { UserRepository } from '../user/user.repository';
import { ContextProvider } from '../../providers/contex.provider';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  async userGetNonce(addr: string): Promise<number> {
    const nonce = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;

    const formatAddr = standardizeAddress(addr);

    let user = await this.userRepo.getUserByAddress(formatAddr);
    if (user === null) {
      user = await this.userRepo.initUser(formatAddr, nonce);
    }

    // update user's nonce
    await this.userRepo.updateUserNonce(user, nonce);
    return nonce;
  }

  async userLogIn(loginDTO: Web3LoginDTO): Promise<string> {
    let { addr, message, signature, publicKey } = loginDTO;

    addr = standardizeAddress(addr);

    if (!isValidUserSignature(addr, message, signature, publicKey)) {
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

  /**
   * getAuthUser
   * @returns
   */
  static getAuthUser() {
    return ContextProvider.getAuthUser();
  }
}
