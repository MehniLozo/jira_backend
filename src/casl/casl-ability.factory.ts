import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from './actions';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { Issue } from '../issue/issue.entity';
import { Comment } from '../comment/comment.entity';
import { Injectable } from '@nestjs/common';

// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
type Subjects =
  | InferSubjects<typeof User | typeof Project | typeof Issue | typeof Comment>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
