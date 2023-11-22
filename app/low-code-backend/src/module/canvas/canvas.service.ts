import { Injectable } from '@nestjs/common';
import { CreateCanvaDto } from './dto/create-canvas.dto';
import { UpdateCanvaDto } from './dto/update-canvas.dto';

@Injectable()
export class CanvasService {
  create(createCanvaDto: CreateCanvaDto) {
    return 'This action adds a new canva';
  }

  findAll() {
    return `This action returns all canvas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canva`;
  }

  update(id: number, updateCanvaDto: UpdateCanvaDto) {
    return `This action updates a #${id} canva`;
  }

  remove(id: number) {
    return `This action removes a #${id} canva`;
  }
}
