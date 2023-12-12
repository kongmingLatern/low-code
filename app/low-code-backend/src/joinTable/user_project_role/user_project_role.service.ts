import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ROLE } from 'src/utils/const';
import { UserProjectRole } from './entities/user_project_role.entity';

@Injectable()
export class UserProjectRoleService {
  @InjectEntityManager()
  private userProjectRoleRepository: EntityManager;

  async add(body) {
    return await this.userProjectRoleRepository.save(body);
  }

  async findByUid(uid) {
    return (await this.findByOptions({ uid })) as UserProjectRole[];
  }

  async findByOptions(options) {
    const { methods = 'all', ...rest } = options;
    switch (methods) {
      case 'all':
        return await this.userProjectRoleRepository.findBy(UserProjectRole, {
          ...options,
        });
      case 'one':
        return await this.userProjectRoleRepository.findOne(UserProjectRole, {
          where: {
            ...rest,
          },
        });
    }
  }

  async deleteAllByProjectId(project_id: string) {
    const res = await this.userProjectRoleRepository.find(UserProjectRole, {
      where: {
        project_id,
      },
    });

    return await Promise.all(
      res?.map(
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

  async changeRole({ project_id, uid }) {
    return await this.userProjectRoleRepository.update(
      UserProjectRole,
      { project_id, uid },
      { role_id: ROLE.CANVAS_MANAGER },
    );
  }
}
