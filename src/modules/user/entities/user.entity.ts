import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntityAutoId } from '../../../common/entities';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends BaseEntityAutoId {
  @Column({ unique: true, nullable: false })
  wallet: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: 'bigint' })
  @Exclude()
  nonce: number;
}
