import { Controller, Logger, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CONTROLLER_CONSTANTS,
  URL_CONSTANTS,
} from '../../common/constants/api.constant';
import { CommonGet } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos/response.dto';
import { OrderService } from './order.service';
import { DrawChartParamDto } from './dto/request/draw-chart.req';

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
  async getChart(@Param() param: DrawChartParamDto) {
    this.logger.log('========== Get user by address ==========');
    return this.orderService.drawChart(param);
  }
}
