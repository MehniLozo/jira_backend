import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {User} from '../user/user.entity';
/*
import {Project} from '';
import {Issue} from '';
import {Comment} from '';
*/
@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Project ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Project name', example: 'Facebook' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Project\'s url',
    example: 'https://editor.swagger.io/?_ga=2.109963653.1268973685.1654855880-1697520630.1654855880',
  })
  @Column({
    unique: true,
  })
  url: string;

  @ApiProperty({ description: 'Project\'s description' })
  @Column()
  description: string;

  /*@OneToMany(
    () => Issue,
    issue => issue.project,
  )
  issues: Issue[];

  @OneToMany(
    () => User,
    user => user.project,
  )
  users: User[];
*/
  @ApiProperty({ description: 'When project was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When project was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

}