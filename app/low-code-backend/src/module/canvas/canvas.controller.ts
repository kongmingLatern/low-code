import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post('/create')
  create(@Body() createCanvaDto: CreateCanvasDto) {
    return this.canvasService.create(createCanvaDto);
  }

  @Get()
  findAll() {
    return this.canvasService.findAll();
  }

  @Get('/getCanvas')
  findOneByProjectId(@Query('project_id') project_id: string) {
    return this.canvasService.findByProjectId(project_id)
  }

  @Get('/getCanvas/:canvas_id')
  findOne(@Param('canvas_id') canvas_id: string) {
    return this.canvasService.findOne(canvas_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanvaDto: UpdateCanvasDto) {
    return this.canvasService.update(+id, updateCanvaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasService.remove(+id);
  }
}
