import { Column, Entity } from 'typeorm';
import { BaseEntityAutoId } from '../../../common/entities';
import { OrderType } from '../../../common/constants/app.constant';

@Entity({ name: 'orders' })
export class Order extends BaseEntityAutoId {
  @Column({ nullable: false, type: 'bigint' })
  base_amount: number;

  @Column({ nullable: false, type: 'bigint' })
  meme_amount: number;

  @Column({ nullable: false, type: 'float4' })
  price: number;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  collection: string;

  @Column({ nullable: false })
  type: OrderType;
}
