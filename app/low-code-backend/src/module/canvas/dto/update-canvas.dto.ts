import { PartialType } from '@nestjs/mapped-types';
import { CreateCanvasDto } from './create-canvas.dto';

export class UpdateCanvasDto extends PartialType(CreateCanvasDto) {}
