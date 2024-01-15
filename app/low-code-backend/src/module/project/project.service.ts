import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { CanvasService } from './../canvas/canvas.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ROLE } from 'src/utils/const';
import { RoleService } from '../role/role.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserCanvasProjectService } from 'src/joinTable/user_canvas_project/user_canvas_project.service';
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
  @Inject()
  private roleService: RoleService;
  @Inject()
  private userProjectRoleService: UserProjectRoleService;
  @Inject(forwardRef(() => CanvasService))
  private canvasService: CanvasService;
  @Inject()
  private userCanvasProjectService: UserCanvasProjectService;

  async create(createProjectDto: CreateProjectDto) {
    const { createBy } = createProjectDto;
    const project: CreateProjectDto = {
      ...createProjectDto,
      project_status: '未开始',
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
    const found = await this.userProjectRoleService.findByOptions({
      methods: 'one',
      uid,
      project_id,
    });
    if (found) {
      // 如果找到,说明已经参加了该项目
      throw new HttpException('该用户已经加入该项目', HttpStatus.BAD_REQUEST);
    }

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
      const result = await this.projectRepository.findOne(Project, {
        where: {
          project_id: i.project_id,
        },
      });
      const role = await this.roleService.find(i.role_id);
      return {
        ...result,
        refMap: {
          role,
        },
      };
    });
  }

  async findAllByUid(uid: string) {
    // const user = await this.userService.findOne(uid);
    const res = await this.userProjectRoleService.findByUid(uid);
    return {
      // ...user,
      projects: await Promise.all(await this.getProjectByProjectIdList(res)),
    };
  }

  async findOneByProjectId(params: { project_id: string; uid?: string }) {
    let userRole, role;
    if (params.uid) {
      userRole = await this.userProjectRoleService.findByOptions({
        methods: 'one',
        project_id: params.project_id,
        uid: params.uid,
      });
      role = await this.roleService.find(userRole.role_id);
    }
    const projectInfo = await this.projectRepository.findOne(Project, {
      where: {
        project_id: params.project_id,
      },
    });

    const authName = await this.userService.findOne(projectInfo.createBy);

    const { canvas } = await this.canvasService.findByProjectId(
      params.project_id,
      false,
    );
    const userList = (await this.userProjectRoleService.findByOptions({
      project_id: params.project_id,
    })) as UserProjectRole[];
    console.log('userList', userList);

    const user = await Promise.all(
      userList.map(async (i) => {
        const r1 = await this.userService.findOne(i.uid, {
          select: {
            uid: true,
            username: true,
            nickname: true,
          },
        });
        const r2 = await this.roleService.find(i.role_id);

        const r3 = await this.canvasService.getCanvasByUid(
          i.uid,
          params.project_id,
        );
        const canvasIdList = r3.canvas.reduce((prev, cur) => {
          if (cur.isEditable !== 0) {
            prev.push(cur.canvas_name);
          }
          return prev;
        }, []);
        return {
          ...i,
          ...r1,
          ...r2,
          canvasList: canvasIdList,
        };
      }),
    );

    return {
      ...projectInfo,
      canvas_num: canvas.length || 0,
      user_num: userList.length,
      createUserName: authName.username,
      role: role?.name || undefined,
      refMap: {
        role,
        canvas,
        users: user,
      },
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
      await this.canvasService.deleteAllByProjectId(project_id);
    } catch (e) {
      throw new HttpException('删除失败', e);
    }
    return '删除成功';
  }

  async deleteUser(uid: string, project_id: string) {
    return await this.userCanvasProjectService.deleteUserByUid(uid, project_id);
  }
}
