import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCollectionPathParamsDto {
  @ApiProperty({
    description: 'collectionId',
    type: String,
  })
  @IsString()
  id: string;
}
