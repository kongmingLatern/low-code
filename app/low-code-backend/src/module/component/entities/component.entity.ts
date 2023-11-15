import { Library } from 'src/module/library/entities/library.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Component extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  component_id: string;

  @Column()
  component_tag: string;

  @Column()
  component_name: string;

  @JoinTable()
  @ManyToOne(() => Library, (lib) => lib.library_id)
  library_id: string[];
}
