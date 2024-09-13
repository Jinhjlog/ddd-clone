export interface UserProps {
  id?: string;
  email: string;
  phone: `${number}-${number}-${number}`;
  username: string;
  password: string;
}
