import { Usecase } from '@lib/use-case';
import {
  Email,
  EmailError,
  Password,
  PasswordError,
  Phone,
  PhoneError,
  User,
  Username,
  UsernameError,
} from '../domain';
import { CreateUserProps } from '../domain/user.types';
import { ValueOf } from 'type-fest';
import { Either } from 'effect';
import { SuccessResultDto } from '../dtos';

const mockExistsUsername = false;
const mockExistsEmail = false;

export const ExmailAlreadyExistsError = '이미 존재하는 이메일입니다.' as const;
export const UsernameAlreadyExistsError =
  '이미 존재하는 유저 이름입니다.' as const;
type CreateUserError =
  | ValueOf<typeof UsernameError>
  | ValueOf<typeof EmailError>
  | ValueOf<typeof PasswordError>
  | ValueOf<typeof PhoneError>
  | typeof ExmailAlreadyExistsError
  | typeof UsernameAlreadyExistsError;

type Result = Promise<Either.Either<SuccessResultDto, CreateUserError>>;

export class CreateUserUsecase implements Usecase<any, Result> {
  async execute(request: CreateUserProps): Result {
    const emailOrError = Email.create(request.email);
    const phoneOrError = Phone.create(request.phone);
    const usernameOrError = Username.create(request.username);
    const passwordOrError = await Password.create(request.password);

    const propsOrError = Either.all([
      emailOrError,
      phoneOrError,
      usernameOrError,
      passwordOrError,
    ]);

    if (Either.isLeft(propsOrError)) {
      return Either.left(propsOrError.left);
    }

    const [email, phone, username, password] = propsOrError.right;
    if (mockExistsEmail) {
      return Either.left(ExmailAlreadyExistsError);
    }

    if (mockExistsUsername) {
      return Either.left(UsernameAlreadyExistsError);
    }

    const user = new User({
      email,
      phone,
      username,
      password,
    });

    // save user to db

    return Either.right(new SuccessResultDto());
  }
}
