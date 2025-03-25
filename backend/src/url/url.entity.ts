import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  originalUrl: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @Column({ default: 0 })
  visits: number;

  @ManyToOne(() => User, (user) => user.urls)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
