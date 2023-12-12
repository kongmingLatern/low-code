import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  @InjectEntityManager()
  private roleRepository: EntityManager;

  async find(id?: number) {
    if (id) {
      return this.roleRepository.findOne(Role, {
        where: {
          id,
        },
      });
    } else {
      return this.roleRepository.find(Role);
    }
  }

  async addRole(body: any) {
    return await this.roleRepository.save(Role, body);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update(Role, id, updateRoleDto);
  }

  async deleteRole(id: string) {
    return await this.roleRepository.delete(Role, id);
  }
}
