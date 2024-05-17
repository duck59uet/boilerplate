import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { PostEntity } from '../post/post.entity';
import { UserDto, type UserDtoOptions } from './dtos/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto, UserDtoOptions> {
  @Column({ nullable: false, type: 'varchar' })
  wallet!: string;

  @Column({ nullable: true, type: 'varchar' })
  avatar!: string | null;

  @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
  posts?: PostEntity[];
}
