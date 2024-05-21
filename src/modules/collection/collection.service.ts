import { Injectable, Logger } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { CreateCollectionDto } from './dto/create-collection.request';
import { ResponseDto } from '../../common/dtos';
import { ErrorMap } from '../../common/error.map';
import { signMessage } from '../../decorators/wallet.decorators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);
  private readonly privateKeyManager;

  constructor(
    private collectionRepo: CollectionRepository,
    private readonly configService: ConfigService,
  ) {
    this.privateKeyManager = configService.get('LAUNCHPAD_PRIVATE_KEY_VERIFIER');
    this.logger.log('============== Constructor Collection Service ==============');
  }

  async createCollection(req: CreateCollectionDto): Promise<ResponseDto<any>>{
    try {

      const { name, symbol, logo_uri, project_uri } = req;
      const data = signMessage(this.logger)(this.privateKeyManager, name, symbol, logo_uri, project_uri);

      return ResponseDto.response(ErrorMap.SUCCESSFUL, data);
    } catch (error) {
      return ResponseDto.responseError(CollectionService.name, error);
    }
  }
}
