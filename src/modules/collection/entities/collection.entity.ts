import { Column, Entity } from 'typeorm';
import { BaseEntityAutoId } from '../../../common/entities';
import { CollectionType } from '../../../common/constants/app.constant';


@Entity({ name: 'collections' })
export class Collection extends BaseEntityAutoId {
  @Column({ nullable: true, name: 'coinMetadata' })
  coin_metadata: string;
    
  @Column({ nullable: false, name: 'logoUri' })
  logo_uri: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: false, name: 'projectUri' })
  project_uri: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true, name: 'txHash' })
  txHash: string;

  @Column({ nullable: true })
  status: CollectionType;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  telegram: string;
}
