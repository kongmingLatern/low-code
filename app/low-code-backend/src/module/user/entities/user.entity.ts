import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
