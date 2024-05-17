import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UserDto, type UserDtoOptions } from './dtos/user.dto';

@Entity({ name: 'user_settings' })
@UseDto(UserDto)
export class UserSettingsEntity extends AbstractEntity<
  UserDto,
  UserDtoOptions
> {
  @Column({ default: false })
  isEmailVerified?: boolean;

  @Column({ default: false })
  isPhoneVerified?: boolean;

  @Column({ type: 'uuid' })
  userId?: string;

//   @OneToOne(() => UserEntity, (user) => user.settings, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   })
//   @JoinColumn({ name: 'user_id' })
//   user?: UserEntity;
}
