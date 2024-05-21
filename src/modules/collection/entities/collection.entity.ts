import { Column, Entity } from 'typeorm';
import { BaseEntityAutoId } from '../../../common/entities';


@Entity({ name: 'collections' })
export class Collection extends BaseEntityAutoId {
  @Column({ nullable: true })
  coin_metadata: string;
    
  @Column({ nullable: false })
  logo_uri: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  owner: string;

  @Column({ nullable: false })
  project_uri: string;

  @Column({ nullable: true })
  symbol: string;
}
