import { Left, Right } from 'effect/Either';
import { Password, PasswordError } from './password';

describe('Password', () => {
  describe('create', () => {
    it('비밀번호는 6자 이상 입력되어야 합니다.', async () => {
      // given
      const password = '1234';

      // when & then
      expect(
        ((await Password.create(password)) as Left<never, Password>).left,
      ).toBe(PasswordError.TooShort);
    });
    it('비밀번호는 17자 이하로 입력되어야 합니다.', async () => {
      // given
      const password = 'jinhyeonjun123456789';

      // when & then
      expect(
        ((await Password.create(password)) as Left<never, Password>).left,
      ).toBe(PasswordError.TooLong);
    });
    it('비밀번호 객체를 생성합니다.', async () => {
      // given
      const password = 'jinhyeonjun123';

      // when & then
      expect(
        ((await Password.create(password)) as Right<never, Password>).right,
      ).toBeInstanceOf(Password);
    });
  });
});
