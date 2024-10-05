import { ValueObject } from '@lib/value-object';
import { left, right } from 'effect/Either';

export const EmailError = {
  InvalidEmail: '유효하지 않은 이메일 형식입니다.',
} as const;

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  private static isValidEmail(value: string): boolean {
    const regex = new RegExp(
      '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    );

    return regex.test(value);
  }

  static create(email: string) {
    if (!this.isValidEmail(email)) {
      return left(EmailError.InvalidEmail);
    }

    return right(new Email({ value: email }));
  }

  static unsafeCreate(email: string): Email {
    return new Email({ value: email });
  }
}
