import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  RelationId,
} from 'typeorm';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @ApiProperty({ description: 'Primary key of the Tag', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Tag name', example: 'BusinessSoftware' })
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.tags, { cascade: true })
  @JoinColumn({ name: 'creatorId' })
  creator: Promise<User>;

  @Column({ nullable: true })
  creatorId: number;

  @ApiProperty({ description: 'Projects Tags' })
  @ManyToMany(() => Project, (project) => project.tags, {
    cascade: true,
  })
  @JoinTable({ name: 'tags_projects' })
  projects: Project[];

  @RelationId((tag: Tag) => tag.projects)
  projectIds: number[];

  @ApiProperty({ description: 'When the tag was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'When the tag was updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
