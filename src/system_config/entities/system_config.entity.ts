import { Column, Entity } from 'typeorm';
import { BaseEntityAutoId } from '../../common/entities';


@Entity({ name: 'system_configs' })
export class SystemConfig extends BaseEntityAutoId {
  @Column({ nullable: false })
  key: string;

  @Column({ nullable: true, type: 'jsonb' })
  data: object;
}
