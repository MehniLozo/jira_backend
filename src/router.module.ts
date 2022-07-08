import { RouterModule } from '@nestjs/core';
import { ProjectModule } from './project/project.module';
import { IssueModule } from './issue/issue.module';
import { CommentModule } from './comment/comment.module';

RouterModule.register([
  {
    path: 'projects',
    module: ProjectModule,
    children: [
      {
        path: 'issues',
        module: IssueModule,
        children: [
          {
            path: 'comments',
            module: CommentModule,
          },
        ],
      },
    ],
  },
]);

export class RouterMod {}
