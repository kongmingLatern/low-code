import { Controller } from '@nestjs/common';
import { UserCanvasProjectService } from './user_canvas_project.service';

@Controller('user-canvas-project')
export class UserCanvasProjectController {
  constructor(
    private readonly userCanvasProjectService: UserCanvasProjectService,
  ) {}
}
