import { Body, Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CONTROLLER_CONSTANTS,
  URL_CONSTANTS,
} from '../../common/constants/api.constant';
import { CommonAuthPost, CommonPost } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos/response.dto';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.request';

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
      description: 'Chart',
      schema: {},
    },
  })
  async getChart(@Body() body: CreateCollectionDto) {
    this.logger.log('========== Get user by address ==========');
    return this.collectionService.createCollection(body);
  }
}
