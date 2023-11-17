import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  @InjectEntityManager()
  private projectRepository: EntityManager;

  async create(createProjectDto: CreateProjectDto) {
    const project = {
      ...createProjectDto,
      project_id: v4(),
      create_time: new Date(),
      update_time: new Date(),
    };
    return await this.projectRepository.save(Project, project);
  }

  async findAll() {
    return await this.projectRepository.find(Project);
  }

  async findOne(project_id: string) {
    return await this.projectRepository.findOne(Project, {
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
