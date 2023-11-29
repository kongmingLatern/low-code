import { CreateCanvasDto, Status } from './dto/create-canvas.dto';
import { Inject, Injectable } from '@nestjs/common';

import { Canvas } from './entities/canvas.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ProjectService } from './../project/project.service';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { initCanvasInfo } from 'src/utils/const';
import { v4 } from 'uuid';

@Injectable()
export class CanvasService {
  @InjectEntityManager()
  private canvasRepository: EntityManager;

  @Inject()
  private projectService: ProjectService;

  async create(createCanvasDto: CreateCanvasDto) {
    const canvas: CreateCanvasDto = {
      ...createCanvasDto,
      canvas_id: v4(),
      canvas_status: Status.NOTSTART,
      canvas_info: JSON.stringify(initCanvasInfo),
    };
    return await this.canvasRepository.save(Canvas, canvas);
  }

  async findAll() {
    return await this.canvasRepository.find(Canvas);
  }

  async findOne(canvas_id: string) {
    const res = await this.canvasRepository.findOne(Canvas, {
      where: {
        canvas_id,
      },
    });
    return res ?? 'NOT FOUND!';
  }

  // TODO: 这里需要对数据进行选取
  async findByProjectId(project_id: string) {
    const project = await this.projectService.findOneByProjectId({
      project_id,
    });
    console.log('project', project);
    return {
      canvas: await this.canvasRepository.find(Canvas),
      ...project,
    };
  }

  async update(id: string, updateCanvaDto: UpdateCanvasDto) {
    return await this.canvasRepository.update(Canvas, id, updateCanvaDto);
  }

  async remove(id: string) {
    return await this.canvasRepository.delete(Canvas, id);
  }
}
