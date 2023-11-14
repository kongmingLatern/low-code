import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  project_code: string | number;

  @Column()
  updateBy: string;

  @Column()
  library_id: string;
}
