import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
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
    //unique: true,
  })
  url: string;

  @ApiProperty({ description: "Project's description" })
  @Column()
  description: string;

  @ApiProperty({ description: "Project\'s Category" })
  @Column({
    name: 'category',
    type: 'enum',
    enum: ProjectCategory,
    default: ProjectCategory.SOFTWARE,
  })
  category: ProjectCategory;

  @ApiProperty({ description: "Project\'s Issues" })
  @OneToMany(() => Issue, (issue) => issue.project, { onDelete: 'CASCADE' })
  issues: Issue[];

  @ApiProperty({ description: "Project\'s Users" })
  @OneToMany(() => User, (user) => user.project)
  users: Promise<User[]>;

/*
  @ApiProperty({ description: "Project\'s Users2" })
  @ManyToMany(() => User, (user) => user.BelongToprojects)
  hasUsers: User[];

  @ApiProperty({ description: "Project\'s Owner" })
  @ManyToOne(() => User, (user) => user.ownProjects)
  lead: User;
  */
  @ApiProperty({ description: 'When project was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When project was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
