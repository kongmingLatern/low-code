import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ProjectService } from '../project/project.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProjectRoleService } from 'src/joinTable/user_project_role/user_project_role.service';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private userRepository: EntityManager;

  @Inject(forwardRef(() => ProjectService))
  private projectService: ProjectService;

  @Inject()
  private userProjectRoleService: UserProjectRoleService;

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      uid: v4(),
    };
    return await this.userRepository.save(User, user);
  }

  async findAll() {
    return await this.userRepository.find(User);
  }

  async findOne(uid: string) {
    const found = await this.userRepository.findOne(User, {
      where: { uid },
    });
    if (!found) {
      throw new NotFoundException(`User with uid ${uid} is not found!`);
    }
    return found;
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(User, uid, updateUserDto);
  }

  async delete(uid: string) {
    try {
      const { projects } = await this.projectService.findAllByUid(uid);

      await Promise.all(
        projects.map(async (p) => {
          const { project_id, createBy } = p;
          // 如果 createBy === uid,那么表示该项目是由该用户自己创建的,要去删掉对应的项目
          if (createBy === uid) {
            await this.projectService.remove(project_id);
          }
          // 连接表中的信息都会进行删除
          await this.userProjectRoleService.deleteById({ uid, project_id });
        }),
      );
      await this.userRepository.delete(User, uid);
    } catch (e) {
      throw new HttpException('删除失败,原因是:', e);
    }
    return '删除成功';
  }
}
