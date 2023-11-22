import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canvasService.findOne(+id);
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
