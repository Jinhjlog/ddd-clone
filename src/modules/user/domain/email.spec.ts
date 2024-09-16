import { Left, Right } from 'effect/Either';
import { Email, EmailError } from './email';

describe('Email', () => {
  describe('create', () => {
    it('이메일 형식이 올바르지 않습니다.', () => {
      // given
      const email = 'jin.example.com';

      // when & then
      expect((Email.create(email) as Left<never, Email>).left).toBe(
        EmailError.InvalidEmail,
      );
    });

    it('이메일 객체를 생성합니다,', () => {
      // given
      const email = 'jin@example.com';

      // when
      const emailObject = (Email.create(email) as Right<never, Email>).right;

      // then
      expect(emailObject).toBeInstanceOf(Email);
    });
  });
});
