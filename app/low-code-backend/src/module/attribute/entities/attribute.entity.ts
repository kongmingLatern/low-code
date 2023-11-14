import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  attribute_id: string;

  @Column()
  attribute_key: string;

  @Column()
  attribut_value: string;

  @Column()
  component_id: string;
}
