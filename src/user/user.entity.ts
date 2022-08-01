import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Issue } from '../issue/issue.entity';
import { Project } from '../project/project.entity';
import { Comment } from '../comment/comment.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User name', example: 'Jhon Doe' })
  @Column({
    unique: true,
  })
  username: string;

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

  @ApiProperty({ description: "User's avatar" })
  @Column()
  avatarUrl: string;

  @ApiProperty({ description: "User's comments" })
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @ApiProperty({ description: "User's Issues" })
  @ManyToMany(() => Issue, (issue) => issue.users)
  issues: Issue[];

  @ApiProperty({ description: "User's Project" })
  projectId: number;
  @ManyToOne(() => Project, (project) => project.users)
  project: Project;
  /*
  @ApiProperty({ description: "User's belong to Projects" })
  @ManyToMany(() => Project, (project) => project.hasUsers)
  @JoinTable()
  BelongToprojects: Project[];

  @ApiProperty({ description: "User's own Projects" })
  @OneToMany(() => Project, (project) => project.lead)
  ownProjects: Project[];
  */
  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When user was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
