import { Email, User, Username } from '../domain';

export interface UserRepository {
  existsEmail(email: Email): Promise<boolean>;
  existsUsername(username: Username): Promise<boolean>;
  create(user: User): Promise<void>;
}
