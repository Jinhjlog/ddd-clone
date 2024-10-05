import { Usecase } from '@lib/use-case';
import { SignInDto } from '../dtos';
import { Password, PasswordError, Username, UsernameError } from '../domain';
import { Either } from 'effect';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../user.constants';
import { UserRepository } from '../infra';
import { ValueOf } from 'type-fest';

export const SignInError = {
  UserNotExistingError: '존재하지 않는 유저입니다.',
  InvalidPasswordError: '비밀번호가 일치하지 않습니다.',
  ...PasswordError,
  ...UsernameError,
} as const;

type Result = Promise<Either.Either<any, ValueOf<typeof SignInError>>>;

export class SignInUsecase implements Usecase<any, Result> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(request: SignInDto): Result {
    // step1: validate args
    const usernameOrError = Username.create(request.username);
    const passwordOrError = await Password.create(request.password);

    const errorOrNot = Either.all([usernameOrError, passwordOrError]);
    if (Either.isLeft(errorOrNot)) {
      return Either.left(errorOrNot.left);
    }

    const [username, password] = errorOrNot.right;

    // step2: get user from db
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      return Either.left(SignInError.UserNotExistingError);
    }

    // step3: compare password
    const passwordValid = await user.props.password.comparePassword(
      password.props.value,
    );

    if (!passwordValid) {
      return Either.left(SignInError.InvalidPasswordError);
    }

    // step4: return token
    return undefined;
  }
}
