import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // NOTE: Finish
  @Post('/create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  // NOTE: Finish
  @Post('/join')
  joinProject(@Body() body) {
    return this.projectService.joinProject(body);
  }

  // NOTE: Finish
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('getProject/:project_id')
  findOneByProjectId(
    @Param('project_id') project_id: string,
    @Query('uid') uid: string,
  ) {
    return this.projectService.findOneByProjectId({ project_id, uid });
  }

  // NOTE: Finish
  @Get('/getAllProject/:uid')
  findAllByUid(@Param('uid') uid: string) {
    return this.projectService.findAllByUid(uid);
  }

  @Get('/getUser/:project_id')
  getUserByProjectId(@Param('project_id') project_id: string) {
    return this.projectService.getUserByProjectId(project_id);
  }

  @Put('/updateProject')
  update(@Body() updateProjectDto) {
    const { project_id } = updateProjectDto;
    return this.projectService.update(project_id, updateProjectDto);
  }

  @Delete('/deleteProject/:project_id')
  remove(@Param('project_id') project_id: string) {
    return this.projectService.remove(project_id);
  }
}
