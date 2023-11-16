import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryModule])],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
