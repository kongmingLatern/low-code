import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
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
  findByProjectId(@Query('project_id') project_id: string) {
    return this.canvasService.findByProjectId(project_id);
  }

  @Get('/getCanvas/:canvas_id')
  findOne(@Param('canvas_id') canvas_id: string) {
    return this.canvasService.findOne(canvas_id);
  }

  @Post('/allocation')
  allocation(@Body() body) {
    return this.canvasService.allocation(body);
  }

  @Put('/updateCanvas')
  update(@Body() updateCanvaDto: UpdateCanvasDto) {
    return this.canvasService.update(updateCanvaDto.canvas_id, updateCanvaDto);
  }

  @Delete('/deleteCanvas/:canvas_id')
  remove(@Param('canvas_id') canvas_id: string) {
    return this.canvasService.remove(canvas_id);
  }
}
