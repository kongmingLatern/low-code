import { v4 } from 'uuid';
import { ProjectService } from './../project/project.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateCanvasDto, Status } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Canvas } from './entities/canvas.entity';

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
      create_time: new Date(),
      update_time: new Date(),
    };
    return await this.canvasRepository.save(Canvas, canvas);
  }

  async findAll() {
    return await this.canvasRepository.find(Canvas, {
      relations: ['project'],
    });
  }

  async findOne(canvas_id: string) {
    const res = await this.canvasRepository.findOne(Canvas, {
      where: {
        canvas_id,
      },
      relations: ['project'],
    });
    return res ?? 'NOT FOUND!';
  }

  update(id: number, updateCanvaDto: UpdateCanvasDto) {
    return `This action updates a #${id} canva`;
  }

  remove(id: number) {
    return `This action removes a #${id} canva`;
  }
}
