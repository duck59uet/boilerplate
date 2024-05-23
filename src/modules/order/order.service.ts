import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ErrorMap } from '../../common/error.map';
import { DrawChartParamDto, DrawChartQueryDto } from './dto/request/draw-chart.req';
import { OrderRepository } from './order.repository';
import { GetOrderHistoryPathParamsDto } from './dto/request/get-order-collection.request';
import { CollectionRepository } from '../collection/collection.repository';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

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
    const { address } = param;
    const { type } = query;

    try {
      const data = await this.orderRepo.drawChart(address, type);

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
}
