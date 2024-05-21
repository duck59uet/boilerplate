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

    async drawChart(address: string, type: string) {
        {
            // query transactions from aura_tx
            // set direction of transaction

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const result: unknown[] = await this.repo.query(`
        SELECT
        date, trade_count, low, high, 
        open_price,
        close_price
    FROM
    (
        SELECT 
            date, trade_count, low, high, 
            trades_open.price  AS open_price,
            trades_close.price AS close_price,
    
            ROW_NUMBER() OVER (PARTITION BY date) AS n
        FROM
        (
            SELECT
                date_trunc($2, "createdAt") AS date,
                COUNT(*)                         AS trade_count,
    
                min( "createdAt" ) open_timestamp,
                max( "createdAt" ) close_timestamp,
    
                min( "price" ) AS low,
                max( "price" ) AS high
            FROM orders
            WHERE "collection" = $1
            GROUP BY date_trunc($2, "createdAt")
        ) tbl
    
        JOIN orders trades_open  ON tbl.open_timestamp  = trades_open."createdAt"
        JOIN orders trades_close ON tbl.close_timestamp = trades_close."createdAt"
        WHERE 
        trades_open.collection = $1
        AND
        trades_close.collection = $1
    ) AS tbl_2
    WHERE n = 1
    ORDER BY date;    
          `,
                [
                    address,
                    type
                ],
            );
            const txs = plainToInstance(ChartResponseDto, result);

            return txs;
        }
    }
}
