import { PartialType } from '@nestjs/mapped-types';
import { CreateCanvaDto } from './create-canvas.dto';

export class UpdateCanvaDto extends PartialType(CreateCanvaDto) {}
