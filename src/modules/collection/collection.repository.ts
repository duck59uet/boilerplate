import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionType } from '../../common/constants/app.constant';

@Injectable()
export class CollectionRepository {
    private readonly logger = new Logger(CollectionRepository.name);

    constructor(
        @InjectRepository(Collection)
        public repo: Repository<Collection>,
    ) {
        this.logger.log(
            '============== Constructor Collection Repository ==============',
        );
    }

    async createCollection(name: string, symbol: string, logo_uri: string, project_uri: string, telegram: string, twitter: string, description: string, owner: string) {
        const collection = new Collection();
        collection.name = name;
        collection.symbol = symbol;
        collection.logo_uri = logo_uri;
        collection.project_uri = project_uri;
        collection.telegram = telegram;
        collection.twitter = twitter;
        collection.description = description;
        collection.status = CollectionType.DRAFT;
        collection.owner = owner;

        await this.repo.save(collection);
    }

    async getAllCollections(
        pageIndex: number,
        limit: number,
      ) {
        const offset = limit * (pageIndex - 1);
        // query transactions from aura_tx
        // set direction of transaction
    
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [itemCount, result] = await Promise.all([
          this.repo.createQueryBuilder('col').where(`col.status = ${CollectionType.PUBLISH}`).getCount(),
          this.repo.query(
            `
            SELECT * FROM collections c
            WHERE c.status = ${CollectionType.PUBLISH}
            ORDER BY c."updatedAt" DESC 
            LIMIT $1 OFFSET $2;
            `,
            [
              limit,
              offset,
            ],
          )
        ]);

        return {
          result,
          itemCount
        };
    }

    async getCollectionById(
        id: string
      ) {
        // query transactions from aura_tx
        // set direction of transaction
    
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: unknown = await this.repo.query(
          `
          SELECT * FROM collections c
          WHERE c.id = '${id}'
          ORDER BY c."updatedAt" DESC;
          `,
        );

        return result;
    }
}