import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvaDto } from './dto/create-canva.dto';
import { UpdateCanvaDto } from './dto/update-canva.dto';

@Controller('canvas')
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post()
  create(@Body() createCanvaDto: CreateCanvaDto) {
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
  update(@Param('id') id: string, @Body() updateCanvaDto: UpdateCanvaDto) {
    return this.canvasService.update(+id, updateCanvaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasService.remove(+id);
  }
}
