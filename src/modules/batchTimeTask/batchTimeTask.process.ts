import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { BatchTimeTaskService } from './batchTimeTask.service';

@Injectable()
@Processor('QUEUE_TASK')
export class BatchTimeTaskProcessor {
  constructor(private readonly batchTimeTaskService: BatchTimeTaskService) {}


  @Process()
  public async processTask(job: Job<{ taskData }>) {
    try {
      this.batchTimeTaskService.handleTask();
    } 
    catch (err: any) {
      console.log("error")
    }
  }
}
