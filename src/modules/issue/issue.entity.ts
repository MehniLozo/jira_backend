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
JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {User} from '../user/user.entity';
import {IssueStatus,IssuePriority} from './issues.constants';
import {Project} from '../project/project.entity';
import Comment from '../comment/comment.entity';

@Entity({ name: 'issues' })
export class Issue extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Issue ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Issue title', example: 'Compilation' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Issue\'s type', example: 'Ops' })
  @Column()
  type: string;

  @ApiProperty({ description: 'Issue\'s status', example: 'Done' })
  @Column()
  status: IssueStatus;

  @Column('varchar')
  priority: IssuePriority;

  @Column('double precision')
  listPosition: number;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('text', { nullable: true })
  descriptionText: string | null;

  @Column('integer', { nullable: true })
  estimate: number | null;

  @Column('integer', { nullable: true })
  timeSpent: number | null;

  @Column('integer', { nullable: true })
  timeRemaining: number | null;

  @ApiProperty({ description: 'When project was created' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'When project was updated' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({ description: 'ReporterID' })
  @Column('integer')
  reporterId: number;


  @ManyToOne(
    () => Project,
    project => project.issues,
  )
  project: Project;

  @ApiProperty({ description: 'ProjectID' })
  @Column('integer')
  projectId: number;

  @OneToMany(
    () => Comment,
    comment => comment.issue,
  )
  comments: Comment[];


  @ManyToMany(
    () => User,
    user => user.issues,
  )
  @JoinTable()
  users: User[];

  @RelationId((issue: Issue) => issue.users)
  userIds: number[];

  /*
  @BeforeInsert()
  @BeforeUpdate()

  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };*/


}
