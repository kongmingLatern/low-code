import { CreateCanvasDto, Status } from './dto/create-canvas.dto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { AllocatinDto } from './dto/allocation-canvas.dto';
import { Canvas } from './entities/canvas.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ProjectService } from './../project/project.service';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { UserCanvasProjectService } from 'src/joinTable/user_canvas_project/user_canvas_project.service';
import { initCanvasInfo } from 'src/utils/const';
import { v4 } from 'uuid';

@Injectable()
export class CanvasService {
  @InjectEntityManager()
  private canvasRepository: EntityManager;

  @Inject(forwardRef(() => ProjectService))
  private projectService: ProjectService;

  @Inject()
  private userCanvasProjectService: UserCanvasProjectService;

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
  async findByProjectId(project_id: string, shouldHasProject: boolean = true) {
    if (shouldHasProject) {
      const project = await this.projectService.findOneByProjectId({
        project_id,
      });
      return {
        canvas: await this.canvasRepository.find(Canvas, {
          select: {
            canvas_id: true,
            canvas_name: true,
            canvas_description: true,
            canvas_status: true,
            create_time: true,
            update_time: true,
          },
          where: {
            project_id,
          },
        }),
        ...project,
      };
    } else {
      return {
        canvas: await this.canvasRepository.find(Canvas, {
          select: {
            canvas_id: true,
            canvas_name: true,
            canvas_description: true,
            canvas_status: true,
            create_time: true,
            update_time: true,
          },
          where: {
            project_id,
          },
        }),
      };
    }
  }

  async update(id: string, updateCanvaDto: UpdateCanvasDto) {
    return await this.canvasRepository.update(Canvas, id, updateCanvaDto);
  }

  async remove(canvas_id: string) {
    return await this.canvasRepository.delete(Canvas, canvas_id);
  }

  async allocation(allocationDto: AllocatinDto) {
    const { canvas_id } = allocationDto;
    const { project_id } = await this.getProjectIdByCanvasId(canvas_id);
    return await this.userCanvasProjectService.allocation({
      ...allocationDto,
      project_id,
    });
  }

  async getProjectIdByCanvasId(canvas_id: string) {
    return await this.canvasRepository.findOne(Canvas, {
      select: {
        project_id: true,
      },
      where: {
        canvas_id,
      },
    });
  }

  async getCanvasByUid(uid: string, project_id: string) {
    return await this.userCanvasProjectService.getCanvasByUid(uid, project_id);
  }

  async deleteAllByProjectId(project_id: string) {
    const records = (
      await this.findByProjectId(project_id, false)
    ).canvas.reduce((prev, cur) => {
      prev.push(cur.canvas_id);
      return prev;
    }, []);
    if (records.length !== 0) {
      return await this.canvasRepository.delete(Canvas, records);
    }
  }
}
