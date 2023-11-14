import { PartialType } from '@nestjs/mapped-types';
import { CreateCanvaDto } from './create-canva.dto';

export class UpdateCanvaDto extends PartialType(CreateCanvaDto) {}
