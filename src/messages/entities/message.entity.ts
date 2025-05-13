import { Person } from 'src/people/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ default: false })
  read: boolean;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'from' })
  from: Person;

  @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'to' })
  to: Person;
}
