import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { Auth, AuthUser } from '../../decorators';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor() {}

//   @Post('login')
//   @HttpCode(HttpStatus.OK)
//   @ApiOkResponse({
//     type: LoginPayloadDto,
//     description: 'User info with access token',
//   })
//   async userLogin(
//     @Body() userLoginDto: UserLoginDto,
//   ): Promise<LoginPayloadDto> {
//     const userEntity = await this.authService.validateUser(userLoginDto);

//     const token = await this.authService.createAccessToken({
//       userId: userEntity.id,
//     //   role: userEntity.role,
//       role: RoleType.USER
//     });

//     return new LoginPayloadDto(userEntity.toDto(), token);
//   }

//   @Post('register')
//   @HttpCode(HttpStatus.OK)
//   @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
//   @ApiFile({ name: 'avatar' })
//   async userRegister(
//     @Body() userRegisterDto: UserRegisterDto,
//     @UploadedFile() file?: IFile,
//   ): Promise<UserDto> {
    // const createdUser = await this.userService.createUser(
    //   userRegisterDto,
    //   file,
    // );

    // return createdUser.toDto({
    //   isActive: true,
    // });
//   }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
