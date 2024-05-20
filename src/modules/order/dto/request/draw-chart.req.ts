import { ApiProperty } from '@nestjs/swagger';

export class DrawChartParamDto {
  @ApiProperty({
    description: 'Collection Address',
    type: String,
  })
  address: string;
}
