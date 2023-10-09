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
    const element = (await this.redisClient.hGet('canvas', 'element')) || null;
    const style = (await this.redisClient.hGet('canvas', 'style')) || null;
    return new R(200, {
      element: JSON.parse(element),
      style: JSON.parse(style),
    });
  }

  async removeKey(key) {
    return await this.redisClient.del(key);
  }

  async setCanvas(obj) {
    const { element, style } = obj;
    // TODO: 这里的canvas也需要更新当前的画布定义 id
    await this.redisClient.hSet('canvas', 'element', JSON.stringify(element));
    await this.redisClient.hSet('canvas', 'style', JSON.stringify(style));
    return 'success';
  }
}
