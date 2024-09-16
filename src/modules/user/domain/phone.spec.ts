import { Left, Right } from 'effect/Either';
import { Phone, PhoneError } from './phone';

describe('Phone', () => {
  describe('create', () => {
    it('전화번호는 필수로 입력해야 합니다.', () => {
      // Todo Parameterized Test
      // when & then
      expect((Phone.create(undefined) as Left<never, Phone>).left).toBe(
        PhoneError.PhoneNull,
      );
      expect((Phone.create(null) as Left<never, Phone>).left).toBe(
        PhoneError.PhoneNull,
      );
    });

    it('전화번호 형식이 올바르지 않습니다.', () => {
      // given
      const phone = '010-1234-567';

      // when & then
      expect((Phone.create(phone) as Left<never, Phone>).left).toBe(
        PhoneError.InvalidPhone,
      );
    });

    it('전화번호 객체를 생성합니다.', () => {
      // given
      const phone = '010-1234-5678';

      // when
      const phoneObject = (Phone.create(phone) as Right<never, Phone>).right;

      // then
      expect(phoneObject).toBeInstanceOf(Phone);
    });
  });
});
