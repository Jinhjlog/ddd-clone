import { Email, User, Username } from '../domain';

export interface UserRepository {
  existsEmail(email: Email): Promise<boolean>;
  existsUsername(username: Username): Promise<boolean>;
  getUserByUsername(username: Username): Promise<User | null>;
  create(user: User): Promise<void>;
}
