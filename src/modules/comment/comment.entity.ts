import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

//import is from 'utils/validation';
import { ApiProperty } from '@nestjs/swagger';
import { Issue} from '../issue/issue.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment extends BaseEntity {
  /*static validations = {
    body: [is.required(), is.maxLength(50000)],
  };*/

  @ApiProperty({ description: 'Primary key as Comment ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Comment\'s body', example: 'Compilation' })
  @Column('text')
  body: string;

  @ApiProperty({ description: 'When issue was created' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'When issue was updated' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.comments,
  )
  user: User;

  @ApiProperty({ description: 'Authors\'s id' })
  @Column('integer',{nullable:true})
  userId: number;

  @ManyToOne(
    () => Issue,
    issue => issue.comments,
    { onDelete: 'CASCADE' },
  )
  issue: Issue;
  @ApiProperty({ description: 'Belonging to an issue id' })
  @Column('integer')
  issueId: number;
}
