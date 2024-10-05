import { Entity, EntityClass } from '@lib/entity';
import { UserProps } from './user.types';
import { Identifier } from '@lib/identifier';
import { v4 as uuidv4 } from 'uuid';

@Entity
export class User extends EntityClass<UserProps> {
  constructor(props: UserProps) {
    super(props, new Identifier(props.id));
  }

  static create(props: Omit<UserProps, 'id'>): User {
    return new User({
      id: uuidv4(),
      ...props,
    });
  }
}
