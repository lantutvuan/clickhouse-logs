import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {Request } from "express";
import { LogsService } from "./logs.service";

@Controller('api')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @Post('system-log')
    postData(@Body() req){
        this.logsService.handleBatch(req.data)
    }

    @Get('system-log')
    async getData(@Req() req: Request) {
        const page: number = parseInt(req.query?.page as string) || 1;
        const limit: number = parseInt(req.query?.limit as string) || 10;
        const search: string = req.query?.s as string || ""
        const offset: number = (page - 1) * limit;
        const range = { from: +req.query?.from || 0, to: +req.query?.to || Date.now() }

        return await this.logsService.get(page, limit, search, range, offset)
    }





    @Post('post')
    writeTable(@Body() data) {

    }

    @Get('create')
    createTable() {
        return  this.logsService.create()
    }
}