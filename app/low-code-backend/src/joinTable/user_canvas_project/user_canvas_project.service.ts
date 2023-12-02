import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCanvasProjectService {
  @InjectEntityManager()
  private userCanvasProjectRepository: EntityManager;
}
