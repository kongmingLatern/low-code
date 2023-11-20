import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import { Project } from './entities/project.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  @InjectEntityManager()
  private projectRepository: EntityManager;
  @Inject()
  private userService: UserService;

  async create(createProjectDto: CreateProjectDto) {
    const { createBy } = createProjectDto;
    const user = await this.userService.findOne(createBy);
    const project: CreateProjectDto = {
      ...createProjectDto,
      project_id: v4(),
      create_time: new Date(),
      update_time: new Date(),
      users: [user],
    };
    return await this.projectRepository.save(Project, project);
  }

  async joinProject(body: Record<string, any>) {
    const { uid, project_id } = body;
    const user = await this.userService.findOne(uid);
    const resultProject = await this.findOneByProjectId(project_id, true);
    const project: CreateProjectDto = {
      ...resultProject,
      users: [...resultProject.users, user],
    };
    return await this.projectRepository.save(Project, project);
  }

  async getUserByProjectId(project_id: string) {
    return await this.projectRepository.find(Project, {
      relations: ['users'],
      where: {
        project_id,
      },
    });
  }

  async findAll() {
    return await this.projectRepository.find(Project);
  }

  async findAllByUid(uid: string) {
    const user = await this.userService.findOne(uid);
    const res = await this.projectRepository.find(Project, {
      relations: ['users'],
      where: {
        users: user,
      },
    });
    return res;
    // return res.map((i) => {
    //   return {
    //     project_id: i.project_id,
    //     project_name: i.project_name,
    //     project_description: i.project_description,
    //     project_status: i.project_status,
    //     project_code: i.project_code,
    //   };
    // });
  }

  async findOneByProjectId(project_id: string, isRelation: boolean = false) {
    const relation = isRelation ? ['users'] : [];
    return await this.projectRepository.findOne(Project, {
      relations: relation,
      where: {
        project_id,
      },
    });
  }

  async update(project_id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update(Project, project_id, {
      ...updateProjectDto,
      update_time: new Date(),
    });
  }

  async remove(project_id: string) {
    return await this.projectRepository.delete(Project, project_id);
  }
}
