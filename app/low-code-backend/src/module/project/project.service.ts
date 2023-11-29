import { HttpException, Inject, Injectable } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ROLE } from 'src/utils/const';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserProjectRole } from 'src/joinTable/user_project_role/entities/user_project_role.entity';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';
import { UserService } from '../user/user.service';
import { v4 } from 'uuid';

@Injectable()
export class ProjectService {
  @InjectEntityManager()
  private projectRepository: EntityManager;
  @Inject()
  private userService: UserService;
  // @Inject()
  // private roleService: RoleService;
  @Inject()
  private userProjectRoleService: UserProjectRoleService;

  async create(createProjectDto: CreateProjectDto) {
    const { createBy } = createProjectDto;
    const project: CreateProjectDto = {
      ...createProjectDto,
      project_id: v4(),
      project_code: String(Math.floor(Math.random() * 100000 + 1000)),
    };
    const { uid } = await this.userService.findOne(createBy);
    const { project_id } = project;
    const userProjectRole = new UserProjectRole(
      uid,
      project_id,
      ROLE.PROJECT_MANAGER,
    );

    try {
      await this.projectRepository.save(Project, project);
      await this.userProjectRoleService.add(userProjectRole);
    } catch (e) {
      throw new HttpException('添加失败', e);
    }
    return 'success';
  }

  async joinProject(body: Record<string, any>) {
    const { uid, project_id, project_code } = body;

    if (isUsingProjectCode()) {
      // 通过项目的邀请码进入的
      const resultProject = await this.findOneByProjectCode(project_code);
      await this.projectRepository.save(Project, resultProject);
      await this.userProjectRoleService.add(
        new UserProjectRole(uid, project_id, ROLE.COMMON),
      );
      return '邀请成功';
    }

    let uidList = uid;
    if (typeof uid === 'string') {
      uidList = [uid];
    }

    uidList.forEach(async (uid) => {
      const project = await this.findOneByProjectId(project_id);
      await this.projectRepository.save(Project, project);
      await this.userProjectRoleService.add(
        new UserProjectRole(uid, project_id, ROLE.COMMON),
      );
    });
    return '邀请成功';

    function isUsingProjectCode() {
      return project_code && typeof uid === 'string';
    }
  }

  async getUserByProjectId(project_id: string) {
    const res = await this.projectRepository.findOne(Project, {
      where: {
        project_id,
      },
    });
    if (res) {
      const { uid, username } = await this.userService.findOne(res.createBy);
      return {
        ...res,
        refMap: {
          uid,
          username,
        },
      };
    } else {
      return [];
    }
  }

  async findAll() {
    return await this.projectRepository.find(Project);
  }

  async getProjectByProjectIdList(projectList: Array<Record<string, any>>) {
    return projectList.map(async (i) => {
      return await this.projectRepository.findOne(Project, {
        where: {
          project_id: i.project_id,
        },
      });
    });
  }

  async findAllByUid(uid: string) {
    const user = await this.userService.findOne(uid);
    const res = await this.userProjectRoleService.findByUid(uid);
    return {
      ...user,
      project: await Promise.all(await this.getProjectByProjectIdList(res)),
    };
  }

  async findOneByProjectId(params: { project_id: string; uid?: string }) {
    const projectInfo = await this.projectRepository.findOne(Project, {
      where: {
        project_id: params.project_id,
      },
    });

    return {
      ...projectInfo,
    };
  }

  async findOneByProjectCode(project_code: string) {
    return await this.projectRepository.findOne(Project, {
      where: {
        project_code,
      },
    });
  }

  async update(project_id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update(Project, project_id, {
      ...updateProjectDto,
    });
  }

  async remove(project_id: string) {
    try {
      await this.projectRepository.delete(Project, project_id);
      await this.userProjectRoleService.deleteAllByProjectId(project_id);
    } catch (e) {
      throw new HttpException('删除失败', e);
    }
    return '删除成功';
  }
}
