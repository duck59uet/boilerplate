import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from './entities/system_config.entity';

@Injectable()
export class SystemConfigRepository {
    private readonly logger = new Logger(SystemConfigRepository.name);

    constructor(
        @InjectRepository(SystemConfig)
        private readonly repo: Repository<SystemConfig>,
    ) {
        this.logger.log(
            '============== Constructor SystemConfig Repository ==============',
        );
    }
}
