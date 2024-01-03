import { Component } from './entities/component.entity';
import { CreateComponentDto } from './dto/create-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Library } from '../library/entities/library.entity';
import { Repository } from 'typeorm';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentService {
  @InjectRepository(Component)
  private componentRepository: Repository<Component>;

  @InjectRepository(Library)
  private libraryRepository: Repository<Library>;

  async create(createComponentDto: CreateComponentDto) {
    const {
      library_id,
      component_type,
      component_tag,
      component_name,
      component_props,
    } = createComponentDto;
    const library = await this.libraryRepository.findOne({
      where: {
        library_id,
      },
    });
    const component = new Component();
    Object.assign(component, {
      library,
      component_type,
      component_tag,
      component_name,
      component_props,
    });

    return await this.componentRepository.save(component);
  }

  async findAll() {
    return await this.componentRepository.find();
  }

  async findOne(component_id: number) {
    return await this.componentRepository.findOne({
      relations: {
        library: true,
      },
      where: {
        component_id,
      },
    });
  }

  async update(component_id: number, updateComponentDto: UpdateComponentDto) {
    const {
      library_id,
      component_name,
      component_tag,
      component_type,
      component_props,
    } = updateComponentDto;
    const component = await this.findOne(component_id);
    const library = await this.libraryRepository.findOne({
      where: {
        library_id,
      },
    });
    Object.assign(component, {
      library,
      component_name,
      component_tag,
      component_type,
      component_props,
    });

    return await this.componentRepository.save(component);
  }

  async remove(component_id: number) {
    return await this.componentRepository.delete(component_id);
  }
}
