import { Module } from '@nestjs/common';
import { SystemConfigController } from './system_config.controller';
import { SystemConfigService } from './system_config.service';
import { SystemConfigRepository } from './system_config.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from './entities/system_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfig])],
  controllers: [SystemConfigController],
  providers: [SystemConfigService, SystemConfigRepository],
  exports: [SystemConfigRepository]
})
export class SystemConfigModule {}
