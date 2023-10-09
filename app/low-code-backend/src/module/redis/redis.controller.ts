import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('/getValue')
  async getKey(@Query('key') key) {
    return await this.redisService.getValue(key);
  }
  @Get('/getCanvas')
  async getCanvas() {
    return await this.redisService.getCanvas();
  }

  @Delete('/remove')
  async removeKey(@Query('key') key) {
    return await this.redisService.removeKey(key);
  }
  @Post('/setCanvas')
  async setValue(@Body() body) {
    return await this.redisService.setCanvas(body);
  }
}
