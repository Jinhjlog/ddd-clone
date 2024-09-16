import { Email } from './email';
import { User } from './user';

describe('User', () => {
  describe('create', () => {
    it('유저 객체를 생성합니다.', () => {
      // given
      const email = Email.create({} as any) as any;
      const phone = '010-1234-5678';
      const username = 'jin';
      const password = 'Test!1234';

      // when
      const user = new User({
        email,
        phone,
        username,
        password,
      });

      // then
      expect(user).toBeInstanceOf(User);
    });
  });
});
