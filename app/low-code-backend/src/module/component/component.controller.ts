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
  findAll(@Query('component_type') component_type: string) {
    if (component_type) {
      return this.findOne(component_type);
    }
    return this.componentService.findAll();
  }

  findOne(component_type: string) {
    return this.componentService.findOne(component_type);
  }

  @Get('getType')
  findAllType() {
    return this.componentService.findAllType();
  }

  @Put('update')
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
