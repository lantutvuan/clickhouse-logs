import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import { BatchTimeTaskModule } from "./modules/batchTimeTask/batchTimeTask.module";
import { LogsModule } from "./modules/logs/logs.module";
import { ClickhouseDatabaseModule } from "./providers/clickhouse/clickhouse/clickhouse.module";
import { RedisConnectorModule } from "./providers/clickhouse/redis/redis.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env'],
        }),
        LogsModule,
        RedisConnectorModule,
        BatchTimeTaskModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}