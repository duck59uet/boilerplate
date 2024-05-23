import { ApiProperty } from '@nestjs/swagger';
import { ChartType } from '../../../../common/constants/app.constant';
import { IsEnum } from 'class-validator';

export class DrawChartParamDto {
  @ApiProperty({
    description: 'Collection Id',
    type: String,
  })
  id: string;
}

export class DrawChartQueryDto {
  @IsEnum(ChartType)
  @ApiProperty({
    description: 'Chart type',
    enum: ChartType
  })
  type: string;
}