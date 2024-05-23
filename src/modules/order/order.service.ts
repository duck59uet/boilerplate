import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ErrorMap } from '../../common/error.map';
import { DrawChartParamDto, DrawChartQueryDto } from './dto/request/draw-chart.req';
import { OrderRepository } from './order.repository';
import { GetOrderHistoryPathParamsDto } from './dto/request/get-order-collection.request';
import { CollectionRepository } from '../collection/collection.repository';
import { CommonUtil } from '../../utils/common.util';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly commonUtil: CommonUtil = new CommonUtil();

  constructor(
    private orderRepo: OrderRepository,
    private collectionRepo: CollectionRepository,
  ) {
    this.logger.log('============== Constructor Order Service ==============');
  }

  async drawChart(
    param: DrawChartParamDto,
    query: DrawChartQueryDto,
  ): Promise<ResponseDto<any>> {
    const { id } = param;
    const { type } = query;

    try {
      const collection = await this.collectionRepo.repo.findOne({where: {id}});
      const data = await this.orderRepo.drawChart(collection.coin_metadata, type);

      return ResponseDto.response(ErrorMap.SUCCESSFUL, data);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }

  async getOrderHistoryByCollection(
    param: GetOrderHistoryPathParamsDto
  ): Promise<ResponseDto<any>> {
    const { id } = param;

    try {
      const collection = await this.collectionRepo.repo.findOne({where: {id}});

      const data = await this.orderRepo.repo.findBy({collection: collection.coin_metadata});

      return ResponseDto.response(ErrorMap.SUCCESSFUL, data);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }

  async getUserOrderHistoryByCollection(
    param: GetOrderHistoryPathParamsDto
  ): Promise<ResponseDto<any>> {
    const { id } = param;

    try {
      const authInfo = this.commonUtil.getAuthInfo();
      const user_id = authInfo.id;

      const collection = await this.collectionRepo.repo.findOne({where: {id}});

      const data = await this.orderRepo.repo.findBy({collection: collection.coin_metadata, user_id });

      return ResponseDto.response(ErrorMap.SUCCESSFUL, data);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }
}
