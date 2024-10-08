import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'username',
  })
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: '',
  })
  password: string;
}
