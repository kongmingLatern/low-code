import { Library } from 'src/module/library/entities/library.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project extends BaseEntity {
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

  @JoinTable()
  @OneToOne(() => Library, (lib) => lib.library_id)
  library_id: string;

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @JoinTable()
  @ManyToOne(() => User, (user) => user.uid)
  uid: string[];
}
