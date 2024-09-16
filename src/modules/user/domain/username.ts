import { ValueObject } from '@lib/value-object';
import { left, right } from 'effect/Either';

export enum UsernameError {
  TooShort = '3자 이상 입력되어야 합니다.',
  TooLong = '15자 이상 입력될 수 없습니다.',
  UsernameNull = '유저 이름을 입력해주세요.',
}

export interface UsernameProps {
  value: string;
}

export class Username extends ValueObject<UsernameProps> {
  static readonly MIN_LENGTH = 3;
  static readonly MAX_LENGTH = 15;

  private constructor(props: UsernameProps) {
    super(props);
  }

  static create(username: string) {
    if (username === undefined || username === null) {
      return left(UsernameError.UsernameNull);
    }

    if (username.length < this.MIN_LENGTH) {
      return left(UsernameError.TooShort);
    }

    if (username.length > this.MAX_LENGTH) {
      return left(UsernameError.TooLong);
    }

    return right(new Username({ value: username }));
  }
}
