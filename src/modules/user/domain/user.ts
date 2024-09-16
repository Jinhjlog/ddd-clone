import { Entity, EntityClass } from '@lib/entity';
import { UserProps } from './user.types';
import { Identifier } from '@lib/identifier';

@Entity
export class User extends EntityClass<UserProps> {
  constructor(props: UserProps) {
    super(props, new Identifier(props.id));
  }
}
