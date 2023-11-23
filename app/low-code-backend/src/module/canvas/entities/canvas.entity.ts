import { Project } from 'src/module/project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    comment: '上次更新时间',
  })
  update_time: Date;

  @JoinColumn({
    name: 'project_id',
  })
  @ManyToOne(() => Project)
  project: Project;
}
