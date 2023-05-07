import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity({ name: 'devices' })
export class Device extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Device ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.devices, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty({ description: 'UserId' })
  @Column({ nullable: false })
  userId: number;
}
