import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { Email } from './domain/email';
import { Either } from 'effect';
import { User } from './domain/user';
import { Phone } from './domain/phone';
import { Username } from './domain/username';
import { Password } from './domain/password';

@Controller('users')
export class UserController {
  @ApiOperation({
    summary: '',
    description: '',
  })
  @ApiCreatedResponse({
    description: '',
  })
  @Post()
  async create(
    @Body() { username, email, password, phone }: CreateUserDto,
  ): Promise<any> {
    const emailOrError = Email.create(email);
    const phoneOrError = Phone.create(phone);
    const usernameOrError = Username.create(username);
    const passwordOrError = await Password.create(password);
    // 1. Either를 사용하는 이유? 장점을 아직까지 모르겠음
    // 2. Presentation Layer에서 지금 처리하는 일이 너무 많음
    // 3. 컨트롤러의 역할에 알맞게 코드를 분리할 것
    const userOrProps = Either.all([
      emailOrError,
      phoneOrError,
      usernameOrError,
      passwordOrError,
    ]);

    Either.match(userOrProps, {
      onLeft: (e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      },
      onRight: ([email, phone, username, password]) => {
        const user = new User({ email, username, password, phone });
        console.log('POST /user');
        console.log(user);
        console.log('------------');
      },
    });
  }
}
