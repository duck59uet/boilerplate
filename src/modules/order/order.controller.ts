import { Controller, Logger, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CONTROLLER_CONSTANTS,
  URL_CONSTANTS,
} from '../../common/constants/api.constant';
import { CommonGet } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos/response.dto';
import { OrderService } from './order.service';
import { DrawChartParamDto, DrawChartQueryDto } from './dto/request/draw-chart.req';
import { GetOrderHistoryPathParamsDto } from './dto/request/get-order-collection.request';

@Controller(CONTROLLER_CONSTANTS.ORDER)
@ApiTags(CONTROLLER_CONSTANTS.ORDER)
export class OrderController {
  public readonly logger = new Logger(OrderController.name);

  constructor(private orderService: OrderService) {}

  @CommonGet({
    url: URL_CONSTANTS.GET_CHART_BY_ADDRESS,
    summary: 'Get chart by address',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Chart',
      schema: {},
    },
  })
  async getChart(@Param() param: DrawChartParamDto, @Query() query: DrawChartQueryDto) {
    this.logger.log('========== Get user by address ==========');
    return this.orderService.drawChart(param, query);
  }

  @CommonGet({
    url: URL_CONSTANTS.ORDER_HISTORY,
    summary: 'Get order history of campaign',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Order history',
      schema: {},
    },
  })
  async getOrderHistory(@Param() param: GetOrderHistoryPathParamsDto) {
    this.logger.log('========== Get order history ==========');
    return this.orderService.getOrderHistoryByCollection(param);
  }
}
