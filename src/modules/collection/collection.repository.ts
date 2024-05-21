import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionRepository {
    private readonly logger = new Logger(CollectionRepository.name);

    constructor(
        @InjectRepository(Collection)
        private readonly repo: Repository<Collection>,
    ) {
        this.logger.log(
            '============== Constructor Collection Repository ==============',
        );
    }
}
