import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SignatureResponseDto {
  @IsArray()
  @ApiProperty({
    example: '[23,12,23]'
  })
  signature: string[];
}