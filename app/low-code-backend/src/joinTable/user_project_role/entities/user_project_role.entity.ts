import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ROLE } from 'src/utils/const';

@Entity()
export class UserProjectRole {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @PrimaryGeneratedColumn('uuid')
  project_id: string;

  @Column()
  role_id: ROLE;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  constructor(uid, project_id, role_id) {
    this.uid = uid;
    this.project_id = project_id;
    this.role_id = role_id;
  }
}
