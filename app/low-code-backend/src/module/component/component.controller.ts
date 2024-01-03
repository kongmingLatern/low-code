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
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @Post('create')
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentService.create(createComponentDto);
  }

  @Get('get')
  findAll(@Query('component_id') component_id: number) {
    if (component_id) {
      return this.findOne(component_id);
    }
    return this.componentService.findAll();
  }

  findOne(component_id: number) {
    return this.componentService.findOne(component_id);
  }

  @Put('update/:component_id')
  update(@Body() updateComponentDto: UpdateComponentDto) {
    return this.componentService.update(
      updateComponentDto.component_id,
      updateComponentDto,
    );
  }

  @Delete('delete/:component_id')
  remove(@Param('component_id') component_id: number) {
    return this.componentService.remove(component_id);
  }
}
