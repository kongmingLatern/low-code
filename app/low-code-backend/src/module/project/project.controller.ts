import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':project_id')
  findOne(@Param('project_id') project_id: string) {
    return this.projectService.findOne(project_id);
  }

  @Put(':project_id')
  update(
    @Param('project_id') project_id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(project_id, updateProjectDto);
  }

  @Delete(':project_id')
  remove(@Param('project_id') project_id: string) {
    return this.projectService.remove(project_id);
  }
}
