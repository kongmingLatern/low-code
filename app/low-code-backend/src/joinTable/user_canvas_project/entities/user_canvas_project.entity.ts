import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCanvasProject {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @PrimaryGeneratedColumn('uuid')
  canvas_id: string;

  @Column()
  project_id: string;
}
