import { Project } from 'src/module/project/entities/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Canvas extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  canvas_id: string;

  @Column()
  canvas_name: string;

  @Column()
  canvas_description: string;

  @Column()
  canvas_status: '已完成' | '进行中' | '未开始';

  @Column()
  create_time: Date;

  @Column()
  update_time: Date;

  @JoinTable()
  @ManyToOne(() => Project, (project) => project.project_id)
  project_id: string;
}
