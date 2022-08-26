/* TASK MODULE, данный модуль будет выполнять фоновые задания с помощью BULL */

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { BatchTimeTaskService } from './batchTimeTask.service';
import { BatchTimeTaskProcessor } from './batchTimeTask.process';
import { RedisConnectorModule } from 'src/providers/clickhouse/redis/redis.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'), // Хост
          port: configService.get('REDIS_PORT'), // Порт
          password: configService.get('REDIS_PASSWORD'), // Пароль
        },
      }),
      inject: [ConfigService], 
    }),

    BullModule.registerQueue({
      name: 'QUEUE_TASK', 
    }),
    
    LogsModule,

    // RedisModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     closeClient: true,
    //     config: {
    //       host: configService.get('REDIS_HOST'),
    //       port: configService.get('REDIS_PORT'),
    //       password: configService.get('REDIS_PASSWORD'),
    //     },
    //   }),
    // }),

    // RedisConnectorModule
  ],
  controllers: [], // Здесь подключаем необходимые контроллеры, если такие необходимы
  providers: [BatchTimeTaskService, BatchTimeTaskProcessor], // Здесь подключаем провайдеры, в нашем случае сервисы и процессор для BULL(TaskProcess)
})
export class BatchTimeTaskModule {}
