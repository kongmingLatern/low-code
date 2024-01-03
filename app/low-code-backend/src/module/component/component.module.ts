import { Component } from './entities/component.entity';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { Library } from '../library/entities/library.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Component, Library])],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
