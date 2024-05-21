import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({
    description: 'Collection Name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Collection Symbol',
    type: String,
  })
  symbol: string;

  @ApiProperty({
    description: 'Logo URI',
    type: String,
  })
  logo_uri: string;

  @ApiProperty({
    description: 'Project URI',
    type: String,
  })
  project_uri: string;
}
