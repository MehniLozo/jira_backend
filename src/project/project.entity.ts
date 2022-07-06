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
import { User } from '../user/user.entity';
import { Issue } from '../issue/issue.entity';
import { ProjectCategory } from './project.constants';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Project ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Project name', example: 'Facebook' })
  @Column()
  name: string;

  @ApiProperty({
    description: "Project's url",
  })
  @Column({
    unique: true,
  })
  url: string;

  @ApiProperty({ description: "Project's description" })
  @Column()
  description: string;

  @ApiProperty({ description: "Project's Owner", type: () => User })
  @ManyToOne(() => User, (user) => user.ownProjects)
  owner: User;

  @Column()
  category: ProjectCategory;
  @OneToMany(
    () => Issue,
    (issue) => issue.project,
    //{cascade:["remove","insert"]}
    { onDelete: 'CASCADE' },
  )
  issues: Issue[];

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({ name: 'projects_users' })
  users: Promise<User[]>;

  @ApiProperty({ description: 'When project was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When project was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
