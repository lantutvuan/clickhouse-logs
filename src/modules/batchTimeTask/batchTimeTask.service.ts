import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class BatchTimeTaskService {
  constructor(
    @InjectQueue('QUEUE_TASK')
    private taskQueue: Queue,
    @InjectRedis() private readonly redis: Redis,
    private logsService: LogsService
  ) {}

  onModuleInit() {
    // this.queueTask();
  }

  async queueTask() {

    await this.taskQueue.add(

      {
        taskData: {

        },
      },

      {
        jobId: `batchTimeTask`, 
        removeOnComplete: true, 
        // repeat: {every: 5000},
        // attempts: 3, 
      },
    );
  }

  async handleTask() {
    console.log('check batch')
    const lastBatchCreationDate = Number(await this.redis.get('lastBatchCreationDate'))
    const currentDate = new Date().getTime()
    if (currentDate - lastBatchCreationDate > 3 * 60 * 1000) {
      console.log("time passed")
      const batch = JSON.parse(await this.redis.get('logs'))
      await this.logsService.write(batch)
      await this.redis.del('logs')
      await this.redis.set('lastBatchCreationDate', currentDate)
    }
  }
}
