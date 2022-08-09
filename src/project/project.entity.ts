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
  Index,
  RelationId,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Issue } from '../issue/issue.entity';
import { ProjectCategory } from './project.constants';
import { Tag } from '../tag/tag.entity';

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
    length: 200,
  })
  url: string;

  @ApiProperty({ description: "Project's description" })
  @Index({ unique: false })
  @Column({
    length: 200,
  })
  description: string;

  @ApiProperty({ description: "Project's Category" })
  @Column({
    name: 'category',
    type: 'enum',
    enum: ProjectCategory,
    default: ProjectCategory.SOFTWARE,
  })
  category: ProjectCategory;

  @ApiProperty({ description: "Projects Tags" })
  @ManyToMany(() => Tag, (tag) => tag.projects, { cascade: true })
  @JoinTable({ name: 'projects_tags' })
  tags: Tag[];

  @RelationId((project: Project) => project.tags)
  tagIds: number[];

  @ApiProperty({ description: "Project's Issues" })
  @OneToMany(() => Issue, (issue) => issue.project, { onDelete: 'CASCADE' })
  issues: Issue[];

  @ApiProperty({ description: "Project's Users2" })
  @ManyToMany(() => User, (user) => user.projects, { cascade: true })
  @JoinTable({ name: 'projects_users' })
  users: User[];

  @RelationId((project: Project) => project.users)
  userIds: number[];

  @ApiProperty({ description: "Project's Owner" })
  @ManyToOne(() => User, (user) => user.ownProjects)
  lead: Promise<User>;

  @RelationId((project: Project) => project.lead)
  leadId: number;

  @ApiProperty({ description: 'When project was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When project was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
