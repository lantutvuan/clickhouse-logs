import { ClickHouseModule } from "@depyronick/nestjs-clickhouse";
import {Module} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LogsController } from "src/modules/logs/logs.controller";
import { ClickhouseDatabaseModule } from "src/providers/clickhouse/clickhouse/clickhouse.module";
import { RedisConnectorModule } from "src/providers/clickhouse/redis/redis.module";
import { LogsService } from "./logs.service";

@Module({
    imports: [
        ClickHouseModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                host: configService.get('CLICKHOUSE_HOST'),
                database: configService.get('CLICKHOUSE_DB'),
                username: configService.get('CLICKHOUSE_USER'),
                password: configService.get('CLICKHOUSE_PASSWORD'),
                synchronize: true,
            })
        }),
    ],
    controllers: [LogsController],
    providers: [LogsService],
    exports: [LogsService],
})

export class LogsModule {}