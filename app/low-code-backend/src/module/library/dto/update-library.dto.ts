import { CreateLibraryDto } from './create-library.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLibraryDto extends PartialType(CreateLibraryDto) {
  library_id: number;
}
