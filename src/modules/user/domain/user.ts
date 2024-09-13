import { Entity, EntityClass, Identifier } from 'src/lib';
import { UserProps } from './user.types';

@Entity
export class User extends EntityClass<UserProps> {
  constructor(props: UserProps) {
    super(props, new Identifier(props.id));
  }
}
