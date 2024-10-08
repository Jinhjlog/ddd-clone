import { ValueObject } from '@lib/value-object';
import { left, right } from 'effect/Either';

export const UsernameError = {
  TooShortUsername: '3자 이상 입력되어야 합니다.',
  TooLongUsername: '15자 이상 입력될 수 없습니다.',
  UsernameNull: '유저 이름을 입력해주세요.',
} as const;

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
      return left(UsernameError.TooShortUsername);
    }

    if (username.length > this.MAX_LENGTH) {
      return left(UsernameError.TooLongUsername);
    }

    return right(new Username({ value: username }));
  }

  static unsafeCreate(username: string): Username {
    return new Username({ value: username });
  }
}
