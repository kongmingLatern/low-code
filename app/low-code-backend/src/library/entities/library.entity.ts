import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Library {
  @PrimaryGeneratedColumn('uuid')
  library_id: string;

  @Column()
  library_name: string;

  @Column()
  version: string;
}
