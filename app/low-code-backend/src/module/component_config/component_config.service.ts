import { ComponentConfig } from './entities/component_config.entity';
import { CreateComponentConfigDto } from './dto/create-component_config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateComponentConfigDto } from './dto/update-component_config.dto';

@Injectable()
export class ComponentConfigService {
  @InjectRepository(ComponentConfig)
  private componentConfigRepository: Repository<ComponentConfig>;

  async create(createComponentConfigDto: CreateComponentConfigDto) {
    const config = new ComponentConfig();
    Object.assign(config, createComponentConfigDto);
    return await this.componentConfigRepository.save(config);
  }

  async findAll() {
    return await this.componentConfigRepository.find();
  }

  async findOne(id: number) {
    return await this.componentConfigRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateComponentConfigDto: UpdateComponentConfigDto) {
    const config = await this.findOne(id);

    Object.assign(config, updateComponentConfigDto);

    return await this.componentConfigRepository.update(id, config);
  }

  async remove(id: number) {
    return await this.componentConfigRepository.delete(id);
  }
}
