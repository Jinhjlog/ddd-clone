import { ValueObject } from '@lib/value-object';
import { left, right } from 'effect/Either';
import * as bcrypt from 'bcrypt';

export interface PasswordProps {
  value: string;
}

export const PasswordError = {
  TooShortPassword: '비밀번호는 6자 이상 입력되어야 합니다.',
  TooLongPassword: '비밀번호는 17자 이하로 입력되어야 합니다.',
} as const;

export class Password extends ValueObject<PasswordProps> {
  static readonly MIN_LENGTH = 6;
  static readonly MAX_LENGTH = 17;

  private constructor(props: PasswordProps) {
    super(props);
  }

  static async create(password: string) {
    if (password.length < this.MIN_LENGTH) {
      return left(PasswordError.TooShortPassword);
    }

    if (password.length > this.MAX_LENGTH) {
      return left(PasswordError.TooLongPassword);
    }

    return right(new Password({ value: await this.hashPassword(password) }));
  }

  static unsafeCreate(password: string): Password {
    return new Password({ value: password });
  }

  private static hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.props.value);
  }
}
