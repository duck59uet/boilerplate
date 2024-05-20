import { ApiProperty } from '@nestjs/swagger';

export class ChartResponseDto {
  @ApiProperty({
    example: '0F85B74D9B5C960AB334211790D6BF38DC39799AAEF6212D9EE7318FA6DDD6F2'
  })
  collection: string;

  @ApiProperty({
    example: '1m',
  })
  the_minute: string;

  @ApiProperty({
    example: '1.2',
  })
  open: string;

  @ApiProperty({
    example: '1.2',
  })
  high: string;

  @ApiProperty({
    example: '1.2',
  })
  low: string;

  @ApiProperty({
    example: '1.2',
  })
  close: string;
}