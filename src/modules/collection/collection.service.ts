import { Injectable, Logger } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { CreateCollectionDto } from './dto/create-collection.request';
import { ResponseDto } from '../../common/dtos';
import { ErrorMap } from '../../common/error.map';
import { signMessage } from '../../decorators/wallet.decorators';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { SignatureResponseDto } from './response/signArray.response';
import { aw } from '@aptos-labs/ts-sdk/dist/common/accountAddress-csDQ8Gnp';
import { CommonUtil } from '../../utils/common.util';
import { GetAllCollectionRequestDto } from './dto/get-all-collection.req';
import { GetCollectionPathParamsDto } from './dto/get-collection.request';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);
  private readonly privateKeyManager;
  private readonly commonUtil: CommonUtil = new CommonUtil();

  constructor(
    private collectionRepo: CollectionRepository,
    private readonly configService: ConfigService,
  ) {
    this.privateKeyManager = configService.get('LAUNCHPAD_PRIVATE_KEY_VERIFIER');
    this.logger.log('============== Constructor Collection Service ==============');
  }

  async createCollection(req: CreateCollectionDto): Promise<ResponseDto<any>>{
    try {
      const authInfo = this.commonUtil.getAuthInfo();
      const creatorAddress = authInfo.address;

      const { name, symbol, logo_uri, project_uri, telegram, twitter, description } = req;
      const data = (await signMessage(this.logger)(this.privateKeyManager, name, symbol, logo_uri, project_uri)).toString();

      await this.collectionRepo.createCollection(name, symbol, logo_uri, project_uri, telegram, twitter, description, creatorAddress);

      const signature = plainToInstance(SignatureResponseDto, data);
      return ResponseDto.response(ErrorMap.SUCCESSFUL, signature);
    } catch (error) {
      return ResponseDto.responseError(CollectionService.name, error);
    }
  }

  async getCollections(
    request: GetAllCollectionRequestDto,
  ): Promise<ResponseDto<any[]>> {
    const { pageSize, pageIndex } = request;

    try {
      const response = await this.collectionRepo.getAllCollections(pageIndex, pageSize);

      return ResponseDto.response(
        ErrorMap.SUCCESSFUL,
        response
      );
    } catch (error) {
      return ResponseDto.responseError(CollectionService.name, error);
    }
  }

  async getCollectionsById(
    param: GetCollectionPathParamsDto,
  ): Promise<ResponseDto<any>> {
    const { id } = param;

    try {
      const response = await this.collectionRepo.repo.findOne({where: { id: id }});

      return ResponseDto.response(
        ErrorMap.SUCCESSFUL,
        response
      );
    } catch (error) {
      return ResponseDto.responseError(CollectionService.name, error);
    }
  }
}
