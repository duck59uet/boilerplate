import { Injectable, Logger } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(private collectionRepo: CollectionRepository) {
    this.logger.log('============== Constructor Collection Service ==============');
  }
}
