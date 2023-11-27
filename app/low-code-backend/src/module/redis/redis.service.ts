import { Inject, Injectable } from '@nestjs/common';

import { R } from 'src/entities/R';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getValue(key) {
    return await this.redisClient.get(key);
  }
  async getCanvas(canvasId?) {
    console.log('getCanvas', canvasId);

    // TODO: 这里要根据对应的canvasId获取到对应的画布信息
    const element =
      (await this.redisClient.hGet(`canvas_${canvasId}`, 'element')) || [];
    const style = (await this.redisClient.hGet(
      `canvas_${canvasId}`,
      'style',
    )) || {
      width: 600,
      height: 800,
      backgroundColor: '#fff',
    };
    const keys = await this.redisClient.keys('*');
    if (!keys.includes(`canvas_${canvasId}`)) {
      await this.setCanvas({ canvasId, element, style });
    }
    return new R(200, {
      canvasId,
      element,
      style,
    });
  }

  async removeKey(key) {
    return await this.redisClient.del(key);
  }

  async setCanvas(obj) {
    const { canvasId, element, style } = obj;
    console.log('setCanvas', obj);

    await this.redisClient.hSet(
      `canvas_${canvasId}`,
      'element',
      JSON.stringify(element),
    );
    await this.redisClient.hSet(
      `canvas_${canvasId}`,
      'style',
      JSON.stringify(style),
    );

    return new R(200, {
      msg: 'success',
    });
  }
}
