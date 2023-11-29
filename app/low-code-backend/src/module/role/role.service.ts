import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  @InjectEntityManager()
  private roleRepository: EntityManager;

  async find(id?: number) {
    return this.roleRepository.findOne(Role, {
      where: {
        id,
      },
    });
  }

  async addRole(body: any) {
    return this.roleRepository.save(Role, body);
  }
}
