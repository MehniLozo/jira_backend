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
import {Issue} from '../issue/issue.entity';
import {ProjectCategory} from './project.constants';

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
/*
  @ApiProperty({ description: 'Project\'s Owner' })
  @Column()
  @ManyToOne(() => User ,user => user.ownProjects)
  owner: User;

  @RelationId((project:Project) => project.owner)
  ownerId : number;
*/
  @Column()
  category: ProjectCategory;
  @OneToMany(
    () => Issue,
    issue => issue.project,
    //{cascade:["remove","insert"]}
    {onDelete: "CASCADE"}
  )
  issues: Issue[];

  @OneToMany(
    () => User,
    user => user.projects,
  )
  users: User[];

  @ApiProperty({ description: 'When project was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When project was updated' })
  @UpdateDateColumn()
  updatedAt: Date;

}
