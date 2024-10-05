import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, SignInDto } from './dtos';
import {
  CreateUserUsecase,
  ExmailAlreadyExistsError,
  SignInUsecase,
  UsernameAlreadyExistsError,
  SignInError,
} from './useCase';
import { Either } from 'effect';
import { DOMPURIFY } from 'src/core/providers/dompurify.provider';
import { DOMPurifyI } from 'dompurify';

@Controller('users')
export class UserController {
  constructor(
    @Inject(DOMPURIFY) private readonly dompurify: DOMPurifyI,
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly signInUsecase: SignInUsecase,
  ) {}

  @ApiOperation({
    summary: '',
    description: '',
  })
  @ApiCreatedResponse({
    description: '',
  })
  @Post()
  async create(@Body() body: CreateUserDto): Promise<void> {
    const phone = this.dompurify.sanitize(body.phone);
    const email = this.dompurify.sanitize(body.email);
    const username = this.dompurify.sanitize(body.username);
    const password = this.dompurify.sanitize(body.password);

    const successOrError = await this.createUserUsecase.execute({
      phone,
      email,
      username,
      password,
    });

    // 컨트롤러의 역할인 응답을 처리하는 부분을 작성
    Either.match(successOrError, {
      onLeft: (e) => {
        switch (e) {
          case ExmailAlreadyExistsError:
          case UsernameAlreadyExistsError:
            throw new HttpException(e, HttpStatus.BAD_REQUEST); // change http status -> Conflict
          default:
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
      },
      onRight: (result) => {},
    });
  }

  @ApiOperation({
    summary: '',
    description: '',
  })
  @ApiCreatedResponse({
    description: '',
  })
  async signIn(@Body() body: SignInDto): Promise<any> {
    const username = this.dompurify.sanitize(body.username);
    const password = this.dompurify.sanitize(body.password);

    const tokenOrError = await this.signInUsecase.execute({
      username,
      password,
    });

    Either.match(tokenOrError, {
      onLeft: (e) => {
        switch (e) {
          case SignInError.InvalidPasswordError:
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
          case SignInError.UserNotExistingError:
            throw new HttpException(e, HttpStatus.NOT_FOUND);
          default:
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
      },
      onRight: (token) => {
        return token;
      },
    });
  }
}
