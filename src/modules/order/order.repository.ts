import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { plainToInstance } from 'class-transformer';
import { ChartResponseDto } from './dto/response/chart.response';

@Injectable()
export class OrderRepository {
    private readonly logger = new Logger(OrderRepository.name);

    constructor(
        @InjectRepository(Order)
        private readonly repo: Repository<Order>,
    ) {
        this.logger.log(
            '============== Constructor Order Repository ==============',
        );
    }

    async drawChart(address: string) {
        {
        // query transactions from aura_tx
        // set direction of transaction

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: unknown[] = await this.repo.query(`
                SELECT collection,
                the_minute,
                OPEN,
                high,
                low,
                CLOSE
         FROM
           (SELECT collection ,
                   TO_CHAR("createdAt", 'YYMMDDHH24MI') AS the_minute ,
                   MIN(price) OVER w AS low ,
                                   MAX(price) OVER w AS high ,
                                                   LAST_VALUE(price) OVER w AS OPEN -- Note the window is in reverse (first value comes last)
          ,
                                                                          FIRST_VALUE(price) OVER w AS CLOSE -- Note the window is in reverse (last value comes first)
          ,
                                                                                                  RANK() OVER w AS the_rank
            FROM "orders" WINDOW w AS (PARTITION BY collection,
                                                    TO_CHAR("createdAt", 'YYMMDDHH24MI')
                                       ORDER BY "createdAt" DESC)) AS inr
         WHERE the_rank = 1 AND collection ilike ?
         ORDER BY 1,
                  2;
          `,
                [
                    address
                ],
            );
            const txs = plainToInstance(ChartResponseDto, result);

            return txs;
        }
    }
}
