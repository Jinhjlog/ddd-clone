import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'username',
  })
  username: string;

  @ApiProperty({
    description: '이메일',
    example: 'higoogle@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'Test!123',
  })
  password: string;

  @ApiProperty({
    description: '전화번호',
    example: '010-1234-5678',
  })
  phone: `${number}-${number}-${number}`;
}
