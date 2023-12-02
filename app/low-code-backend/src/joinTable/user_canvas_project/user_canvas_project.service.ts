import { AllocatinDto } from 'src/module/canvas/dto/allocation-canvas.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserCanvasProject } from './entities/user_canvas_project.entity';

@Injectable()
export class UserCanvasProjectService {
  @InjectEntityManager()
  private userCanvasProjectRepository: EntityManager;

  async allocation(allocationDto: AllocatinDto) {
    const userCanvasProject = new UserCanvasProject();
    Object.assign(userCanvasProject, allocationDto);
    return await this.userCanvasProjectRepository.save(userCanvasProject);
  }
}
