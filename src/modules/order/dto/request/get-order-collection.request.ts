import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOrderHistoryPathParamsDto {
  @ApiProperty({
    description: 'collectionId',
    type: String,
  })
  @IsString()
  id: string;
}
