import { Email } from './email';
import { Password } from './password';
import { Phone } from './phone';
import { Username } from './username';

export interface UserProps {
  id?: string;
  email: Email;
  phone: Phone;
  username: Username;
  password: Password;
}

export type CreateUserProps = {
  [K in keyof UserProps]: string;
};
