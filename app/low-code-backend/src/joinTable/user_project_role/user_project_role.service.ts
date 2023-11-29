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

  async deleteAllByProjectId(project_id: string) {
    const res = await this.userProjectRoleRepository.find(UserProjectRole, {
      where: {
        project_id,
      },
    });
    return await Promise.all(
      res.map(
        async (i) =>
          await this.userProjectRoleRepository.delete(UserProjectRole, {
            uid: i.uid,
            project_id: i.project_id,
          }),
      ),
    );
  }

  async deleteById(options) {
    return await this.userProjectRoleRepository.delete(
      UserProjectRole,
      options,
    );
  }
}
