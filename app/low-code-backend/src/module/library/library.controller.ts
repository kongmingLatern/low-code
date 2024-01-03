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
import { LibraryService } from './library.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('create')
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get('get')
  findAll(@Query('library_id') library_id: number) {
    if (library_id) {
      return this.findOne(library_id);
    }
    return this.libraryService.findAll();
  }

  findOne(library_id: number) {
    return this.libraryService.findOne(library_id);
  }

  @Put('update')
  update(@Body() updateLibraryDto: UpdateLibraryDto) {
    return this.libraryService.update(
      updateLibraryDto.library_id,
      updateLibraryDto,
    );
  }

  @Delete('delete/:component_id')
  remove(@Param('component_id') component_id: number) {
    return this.libraryService.remove(component_id);
  }
}
