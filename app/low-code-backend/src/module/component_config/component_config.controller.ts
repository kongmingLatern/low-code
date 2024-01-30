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
import { ComponentConfigService } from './component_config.service';
import { CreateComponentConfigDto } from './dto/create-component_config.dto';
import { UpdateComponentConfigDto } from './dto/update-component_config.dto';

@Controller('component-config')
export class ComponentConfigController {
  constructor(
    private readonly componentConfigService: ComponentConfigService,
  ) {}

  @Post('create')
  create(@Body() createComponentConfigDto: CreateComponentConfigDto) {
    return this.componentConfigService.create(createComponentConfigDto);
  }

  @Get('get')
  findAll(@Query('id') id: number) {
    if (id) {
      return this.findOne(id);
    }
    return this.componentConfigService.findAll();
  }

  @Get('getTag')
  findOneByTag(@Query('component_tag') tag: string) {
    return this.componentConfigService.findOneByTag(tag);
  }

  findOne(@Param('id') id: number) {
    return this.componentConfigService.findOne(+id);
  }

  @Put('update')
  update(@Body() updateComponentConfigDto: UpdateComponentConfigDto) {
    return this.componentConfigService.update(
      updateComponentConfigDto.id,
      updateComponentConfigDto,
    );
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.componentConfigService.remove(id);
  }
}
