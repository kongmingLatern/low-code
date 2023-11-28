import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProjectRole {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @PrimaryGeneratedColumn('uuid')
  project_id: string;

  @Column()
  role_id: string;

  constructor(uid, project_id, role_id) {
    this.uid = uid;
    this.project_id = project_id;
    this.role_id = role_id;
  }
}
