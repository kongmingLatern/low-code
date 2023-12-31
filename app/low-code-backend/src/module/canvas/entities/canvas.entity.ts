import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  canvas_info: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  create_time: Date;

  @UpdateDateColumn({
    comment: '上次更新时间',
  })
  update_time: Date;

  @Column()
  project_id: string;
}
