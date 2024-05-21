import { Injectable, Logger } from '@nestjs/common';
import { SystemConfigRepository } from './system_config.repository';

@Injectable()
export class SystemConfigService {
  private readonly logger = new Logger(SystemConfigService.name);

  constructor(private systemRepo: SystemConfigRepository) {
    this.logger.log('============== Constructor Order Service ==============');
  }
}
