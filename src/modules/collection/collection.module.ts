import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionRepository } from './collection.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  providers: [CollectionService, CollectionRepository],
  controllers: [CollectionController],
  exports: [CollectionRepository]
})
export class CollectionModule {}
