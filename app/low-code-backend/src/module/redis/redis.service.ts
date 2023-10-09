import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getValue(key) {
    return await this.redisClient.get(key);
  }
  async getCanvas() {
    return await this.redisClient.get('canvas');
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
