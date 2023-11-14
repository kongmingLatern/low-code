import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  component_id: string;

  @Column()
  component_tag: string;

  @Column()
  component_name: string;

  @Column()
  library_id: string;
}
