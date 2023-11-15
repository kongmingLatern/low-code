import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

export class ProjectRepository extends Repository<Project> {}
