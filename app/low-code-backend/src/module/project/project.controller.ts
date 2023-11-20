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

  @Post('/join')
  joinProject(@Body() body) {
    return this.projectService.joinProject(body);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':project_id')
  findOneByProjectId(@Param('project_id') project_id: string) {
    console.log('project_id', project_id);
    return this.projectService.findOneByProjectId(project_id);
  }

  @Get('/uid/:uid')
  findOneByUid(@Param('uid') uid: string) {
    return this.projectService.findAllByUid(uid);
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
