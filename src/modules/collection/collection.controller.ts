import { Body, Controller, Logger, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CONTROLLER_CONSTANTS,
  URL_CONSTANTS,
} from '../../common/constants/api.constant';
import { CommonAuthPost, CommonGet, CommonPost } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos/response.dto';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.request';
import { query } from 'express';
import { GetAllCollectionRequestDto } from './dto/get-all-collection.req';

@Controller(CONTROLLER_CONSTANTS.COLLECTION)
@ApiTags(CONTROLLER_CONSTANTS.COLLECTION)
export class CollectionController {
  public readonly logger = new Logger(CollectionController.name);

  constructor(private collectionService: CollectionService) {}

  @CommonAuthPost({
    url: URL_CONSTANTS.CREATE_COLLECTION,
    summary: 'Create collection',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Create collection',
      schema: {},
    },
  })
  async createCollection(@Body() body: CreateCollectionDto) {
    this.logger.log('========== Create collection ==========');
    return this.collectionService.createCollection(body);
  }

  @CommonGet({
    url: '',
    summary: 'Get all collection',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Get all collection',
      schema: {},
    },
  })
  async getCollection(@Query() query: GetAllCollectionRequestDto) {
    this.logger.log('========== Get all collection ==========');
    return this.collectionService.getCollections(query);
  }
}
