import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryRepository } from './repository/library.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryRepository])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
