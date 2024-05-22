import { Body, Controller, Inject, Logger, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CONTROLLER_CONSTANTS, URL_CONSTANTS } from '../../common/constants/api.constant';
import { CommonPost } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos';
import { UploadLinkDto } from './request/upload.req';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';


@Controller(CONTROLLER_CONSTANTS.UPLOAD)
@ApiTags(CONTROLLER_CONSTANTS.UPLOAD)
export class UploadController {
  public readonly logger = new Logger(UploadController.name);

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  constructor() { }

  @CommonPost({
    url: URL_CONSTANTS.UPLOAD_GCP,
    summary: 'Upload to gcp',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Upload to gcp',
      schema: {},
    },
  })
  async uploadToGCP(@Body() body: UploadLinkDto) {
    this.logger.log('========== Upload to GCP ==========');
    // Creates a client
    const { Storage } = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage({
      keyFilename: this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS')
    });

    const options = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 60 * 60 * 1000, // 60 minutes
      // contentType: createUploadLink.type,
    };

    const bucketName = this.configService.get<string>('MEME_BUCKET_NAME');

    // Get a v4 signed URL for uploading file
    const { fileName } = body;
    const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
    const filenameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));

    const [url] = await storage
      .bucket(bucketName)
      .file(`${filenameWithoutExtension}-${uuidv4()}.${extension}`)
      .getSignedUrl(options);

    return url;
  }
}
