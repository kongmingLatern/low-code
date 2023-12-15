import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({
    default: 0,
  })
  isAdmin: number;
}
