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
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import {Issue} from '../issue/issue.entity';
import {Project} from '../project/project.entity';

import {Comment} from '../comment/comment.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User name', example: 'Jhon Doe' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jhon.doe@gmail.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  password: string;


  @ApiProperty({ description: 'User\'s comments' })
  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments:Comment[];
  @ApiProperty({ description: 'User\'s Issues' })
  @ManyToMany(
    () => Issue,
    issue => issue.users,
  )
  issues: Issue[];

  @ApiProperty({ description: 'User\'s Project' })
  @ManyToMany(
    () => Project,
    project => project.users,
  )
  projects: Project[];
/*
  //needs a fix here pls
  @ApiProperty({ description: 'User\'s owned projects' })
  @OneToMany(
    () => Project,
    project => project.ownerId,
  )
  ownProjects: Project[];
*/
  /*@RelationId((user: User) => user.project)
  projectId: number;*/

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
