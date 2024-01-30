import { CreateComponentConfigDto } from './create-component_config.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateComponentConfigDto extends PartialType(
  CreateComponentConfigDto,
) {
  id: number;
}
