import { Email } from './email';
import { Password } from './password';
import { Phone } from './phone';
import { User } from './user';
import { Username } from './username';

describe('User', () => {
  describe('create', () => {
    it('유저 객체를 생성합니다.', () => {
      // given
      const email = Email.create({} as any) as any;
      const phone = Phone.create('010-1234-1234') as any;
      const username = Username.create('name') as any;
      const password = Password.create('test!123') as any;

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
