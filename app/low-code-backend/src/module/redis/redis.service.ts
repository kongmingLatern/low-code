import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { R } from 'src/entities/R';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getValue(key) {
    return await this.redisClient.get(key);
  }
  async getCanvas() {
    const element = (await this.redisClient.hGet('canvas', 'element')) || [];
    const style = (await this.redisClient.hGet('canvas', 'style')) || {
      width: 600,
      height: 800,
      backgroundColor: '#fff',
    };
    return new R(200, {
      element,
      style,
    });
  }

  async removeKey(key) {
    return await this.redisClient.del(key);
  }

  async setCanvas(obj) {
    const { element, style } = obj;
    console.log('element', element);
    console.log('style', style);
    // TODO: 这里的canvas也需要更新当前的画布定义 id
    await this.redisClient.hSet('canvas', 'element', JSON.stringify(element));
    await this.redisClient.hSet('canvas', 'style', JSON.stringify(style));
    return 'success';
  }
}
