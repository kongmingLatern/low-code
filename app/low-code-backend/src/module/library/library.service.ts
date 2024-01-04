import { CreateLibraryDto } from './dto/create-library.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Library } from './entities/library.entity';
import { Repository } from 'typeorm';
import { UpdateLibraryDto } from './dto/update-library.dto';

@Injectable()
export class LibraryService {
  @InjectRepository(Library)
  private libraryRepository: Repository<Library>;

  async create(createLibraryDto: CreateLibraryDto) {
    const library = new Library();
    Object.assign(library, createLibraryDto);
    return await this.libraryRepository.save(library);
  }

  async findAll() {
    return await this.libraryRepository.find();
  }

  async findOne(library_id: number) {
    return await this.libraryRepository.findOne({
      where: {
        library_id,
      },
    });
  }

  async update(library_id: number, updateLibrary: UpdateLibraryDto) {
    const library = await this.findOne(library_id);
    Object.assign(library, updateLibrary);
    return await this.libraryRepository.save(library);
  }

  async remove(library_id: number) {
    return await this.libraryRepository.delete(library_id);
  }
}
