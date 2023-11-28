import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserProjectRole } from './entities/user_project_role.entity';

@Injectable()
export class UserProjectRoleService {
  @InjectEntityManager()
  private userProjectRoleRepository: EntityManager;

  async add(body) {
    return await this.userProjectRoleRepository.save(body);
  }

  async findByUid(uid) {
    return await this.userProjectRoleRepository.findBy(UserProjectRole, {
      uid,
    });
  }
}
