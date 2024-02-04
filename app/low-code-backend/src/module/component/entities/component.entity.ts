import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Library } from 'src/module/library/entities/library.entity';

@Entity()
export class Component {
  @PrimaryGeneratedColumn('increment')
  component_id: number;

  @Column()
  component_type: string;

  @Column()
  component_tag: string;

  @Column()
  component_name: string;

  @Column({
    type: 'text',
    default: null,
  })
  component_props: string;

  @OneToOne(() => Library, (lib) => lib.library_id)
  @JoinColumn()
  library: Library;
}
