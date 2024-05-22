import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsImageFilename } from '../../../shared/is-image-filename';

export class UploadLinkDto {
  @ApiProperty({ required: true })
  @IsImageFilename()
  fileName: string;

  @ApiProperty({ required: true })
  @IsString()
  type: string;
}
