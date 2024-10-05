import { Left, Right } from 'effect/Either';
import { Username, UsernameError } from './username';

describe('Username', () => {
  describe('create', () => {
    it('유저 이름은 3자 이상 입력되어야 합니다.', () => {
      // given
      const username = 'ji';

      // when & then
      expect((Username.create(username) as Left<never, Username>).left).toBe(
        UsernameError.TooShortUsername,
      );
    });

    it('유저 이름은 15자 이상 입력될 수 없습니다.', () => {
      // given
      const username = 'JinHyeonjun12345';

      // when & then
      expect((Username.create(username) as Left<never, Username>).left).toBe(
        UsernameError.TooLongUsername,
      );
    });

    it('유저 이름은 필수로 입력해야 합니다.', () => {
      // Todo Parameterized Test

      expect((Username.create(undefined) as Left<never, Username>).left).toBe(
        UsernameError.UsernameNull,
      );
      expect((Username.create(null) as Left<never, Username>).left).toBe(
        UsernameError.UsernameNull,
      );
    });

    it('유저 이름 객체를 생성합니다.', () => {
      // given
      const username = 'JinHyeonjun';

      // when
      const usernameObject = (
        Username.create(username) as Right<never, Username>
      ).right;

      expect(usernameObject).toBeInstanceOf(Username);
    });
  });
});
