import { User } from 'src/module/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  project_code: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @JoinTable({
    name: 'project_user',
  })
  @ManyToMany(() => User)
  users: User[];

  // @JoinColumn({
  //   name: 'uid',
  // })
  // @ManyToOne(() => User, (user) => user.uid)
  // uid: string[];

  @Column()
  createBy: string;
}
