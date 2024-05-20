import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ErrorMap } from '../../common/error.map';
import { DrawChartParamDto } from './dto/request/draw-chart.req';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private orderRepo: OrderRepository) {
    this.logger.log('============== Constructor Order Service ==============');
  }

  async drawChart(
    param: DrawChartParamDto,
  ): Promise<ResponseDto<any>> {
    const { address } = param;
    try {
      return ResponseDto.response(ErrorMap.SUCCESSFUL);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }
}
