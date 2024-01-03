import { CreateComponentDto } from './create-component.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateComponentDto extends PartialType(CreateComponentDto) {
  component_id: number;
}
