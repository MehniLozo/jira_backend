import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  ManyToOne,
  RelationId,
JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {User} from '../user/user.entity';
import {IssueStatus,IssuePriority,IssueType} from './issues.constants';
import {Project} from '../project/project.entity';
import {Comment} from '../comment/comment.entity';

@Entity({ name: 'issues' })
export class Issue extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Issue ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Issue title', example: 'Compilation' })
  @Column({nullable:false, unique:true})
  title: string;

  @ApiProperty({ description: 'Issue\'s type', example: IssueType.STORY })
  @Column({nullable:false})
  type: IssueType;

  @ApiProperty({ description: 'Issue\'s status', example: IssueStatus.DONE })
  @Column()
  status: IssueStatus;

  @Column('varchar')
  priority: IssuePriority;

  @Column({nullable:true})
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

  @OneToOne(() => User)
  reporter: User;
  @ApiProperty({ description: 'Reporter' })
  @Column({nullable:true})
  //@RelationId((user: User) => user.)
  reporterId: number;

  @ManyToOne(
    () => Project,
    project => project.issues,
    { onDelete: 'CASCADE' }
  )
  project: Project;

  @ApiProperty({ description: 'ProjectID' })
  @Column({nullable:false})
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
  usersIds: number[];

  /*
  //some process decoration still need to be done soon enough
  @BeforeInsert()
  @BeforeUpdate()

  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };*/


}
