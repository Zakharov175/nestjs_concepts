import { IsEmail, IsStrongPassword } from 'class-validator';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial',
    },
  )
  passwordHash: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Message, message => message.from)
  sendMessages: Message[];

  @OneToMany(() => Message, message => message.to)
  receivedMessage: Message[];
}
