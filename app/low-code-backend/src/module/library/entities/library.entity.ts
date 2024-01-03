import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Library {
  @PrimaryGeneratedColumn('increment')
  library_id: number;

  @Column()
  library_name: string;

  @Column()
  version: string;
}
