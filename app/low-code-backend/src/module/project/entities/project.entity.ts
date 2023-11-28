import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({
    unique: true,
    nullable: false,
    comment: '邀请码',
  })
  project_code: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column()
  createBy: string;
}
