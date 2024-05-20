import { Module } from '@nestjs/common';
import { SystemConfigController } from './system_config.controller';
import { SystemConfigService } from './system_config.service';

@Module({
  controllers: [SystemConfigController],
  providers: [SystemConfigService]
})
export class SystemConfigModule {}
