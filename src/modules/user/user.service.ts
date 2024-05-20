import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ErrorMap } from '../../common/error.map';
import { UserRepository } from './user.repository';
import { GetUserPathParamDto } from './dto/request/get-user.req';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepo: UserRepository) {
    this.logger.log('============== Constructor User Service ==============');
  }

  async getUserByAddress(
    param: GetUserPathParamDto,
  ): Promise<ResponseDto<User>> {
    const { address } = param;
    try {
      const user = await this.userRepo.getUserByAddress(address);
      return ResponseDto.response(ErrorMap.SUCCESSFUL, user);
    } catch (error) {
      return ResponseDto.responseError(UserService.name, error);
    }
  }
}
