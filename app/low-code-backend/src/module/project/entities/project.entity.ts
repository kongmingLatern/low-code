import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/module/user/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  project_id: string;

  @Column()
  project_name: string;

  @Column()
  project_description: string;

  @Column()
  project_status: '已完成' | '进行中' | '未开始';

  @Column({
    unique: true,
    nullable: false,
    comment: '邀请码',
  })
  project_code: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    comment: '上次更新时间',
  })
  update_time: Date;

  @JoinTable({
    name: 'project_user',
  })
  @ManyToMany(() => User)
  users: User[];

  @Column()
  createBy: string;
}
