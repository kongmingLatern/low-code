import { Project } from 'src/module/project/entities/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Canvas {
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

  @JoinColumn({
    name: 'project_id',
  })
  @ManyToOne(() => Project)
  project: Project;
}
