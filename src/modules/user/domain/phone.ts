import { ValueObject } from '@lib/value-object';
import { left, right } from 'effect/Either';

interface PhoneProps {
  value: string;
}

export const PhoneError = {
  InvalidPhone: '유효하지 않은 전화번호 형식입니다.',
  PhoneNull: '전화번호를 입력해주세요.',
} as const;

export class Phone extends ValueObject<PhoneProps> {
  private constructor(props: PhoneProps) {
    super(props);
  }

  private static isValidPhone(value: string): boolean {
    const regex = new RegExp('^[0-9]{3}-[0-9]{4}-[0-9]{4}$');

    return regex.test(value);
  }

  static create(phone?: string) {
    if (phone === undefined || phone === null) {
      return left(PhoneError.PhoneNull);
    }

    if (!this.isValidPhone(phone)) {
      return left(PhoneError.InvalidPhone);
    }

    return right(new Phone({ value: phone }));
  }
}
