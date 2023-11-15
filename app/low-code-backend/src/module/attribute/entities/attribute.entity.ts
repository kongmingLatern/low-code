import { Component } from 'src/module/component/entities/component.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Attribute extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  attribute_id: string;

  @Column()
  attribute_key: string;

  @Column()
  attribut_value: string;

  @JoinTable()
  @ManyToOne(() => Component, (com) => com.component_id)
  component_id: string[];
}
