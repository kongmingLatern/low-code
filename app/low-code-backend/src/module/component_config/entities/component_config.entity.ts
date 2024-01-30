import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ComponentConfig {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  component_name: string;

  @Column()
  component_type: string;

  @Column()
  component_tag: string;

  @Column()
  placeholder: string;

  @Column({
    default: '',
  })
  options: string;
}
