import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';

import { AllocatinDto } from 'src/module/canvas/dto/allocation-canvas.dto';
import { CanvasService } from 'src/module/canvas/canvas.service';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UserCanvasProject } from './entities/user_canvas_project.entity';
import { UserProjectRole } from '../user_project_role/entities/user_project_role.entity';
import { UserProjectRoleService } from '../user_project_role/user_project_role.service';

@Injectable()
export class UserCanvasProjectService {
  @InjectEntityManager()
  private userCanvasProjectRepository: EntityManager;

  @Inject()
  private userProjectRoleService: UserProjectRoleService;

  @Inject(forwardRef(() => CanvasService))
  private canvasService: CanvasService;

  async allocation(allocationDto: AllocatinDto) {
    const userCanvasProject = new UserCanvasProject();
    Object.assign(userCanvasProject, allocationDto);
    return await this.userCanvasProjectRepository.save(userCanvasProject);
  }

  async getCanvasByUid(uid: string, project_id: string) {
    // 根据 uid 和 project_id 获取用户的身份
    const user = (await this.userProjectRoleService.findByOptions({
      methods: 'one',
      uid,
      project_id,
    })) as UserProjectRole;

    if (!user) {
      throw new HttpException('您还没加入此项目,无权限', 403);
    }
    const { role_id } = user;

    // 如果身份是1,说明是创建者,那么无需查此表,直接根据 project_id 查询全部画布即可.
    if (role_id === 1) {
      // NOTE: 创建者
      return (
        await this.canvasService.findByProjectId(project_id, false)
      ).canvas.map((i) => {
        return {
          ...i,
          isEditable: 1,
        };
      });
    } else {
      const res = await this.userCanvasProjectRepository.find(
        UserCanvasProject,
        {
          where: { uid },
        },
      );
      const canvasList = res.map((i) => i.canvas_id);
      const allCanvas = await this.canvasService.findByProjectId(
        project_id,
        false,
      );
      return allCanvas.canvas.map((c) => {
        // 如果不包含在可编辑的范围内,那么就给一个状态
        // NOTE: isEditable(是否可编辑) 1 是 0 否
        if (!canvasList.includes(c.canvas_id)) {
          return {
            ...c,
            isEditable: 0,
          };
        } else {
          return {
            ...c,
            isEditable: 1,
          };
        }
      });
    }
  }

  async deleteUserByUid(uid: string, project_id: string) {
    return await Promise.all([
      await this.userCanvasProjectRepository.delete(UserCanvasProject, {
        uid,
        project_id,
      }),
      await this.userProjectRoleService.deleteById({ uid, project_id }),
    ]);
  }
}
