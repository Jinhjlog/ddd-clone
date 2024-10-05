import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Email, Password, Phone, User, Username } from '../domain';
import { PRISMA_CLIENT } from 'src/core/database/prisma.di-tokens';
import { Prisma, PrismaClient } from '@prisma/client';

export type UserModel = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    phone: true;
    username: true;
  };
}>;

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly prismaClient: PrismaClient,
  ) {}

  async existsEmail(email: Email): Promise<boolean> {
    const user = await this.prismaClient.user.findUnique({
      where: { email: email.props.value },
    });

    return !!user;
  }

  async existsUsername(username: Username): Promise<boolean> {
    const user = await this.prismaClient.user.findUnique({
      where: { username: username.props.value },
    });

    return !!user;
  }

  async getUserByUsername(username: Username): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { username: username.props.value },
    });

    return user
      ? new User({
          id: user.id,
          email: Email.unsafeCreate(user.email),
          phone: Phone.unsafeCreate(user.phone),
          username: Username.unsafeCreate(user.username),
          password: Password.unsafeCreate(user.password),
        })
      : null;
  }

  async create(user: User): Promise<void> {
    const { id, email, password, phone, username } = user.props;

    console.log(user);

    await this.prismaClient.user.create({
      data: {
        id,
        email: email.props.value,
        password: password.props.value,
        phone: phone.props.value,
        username: username.props.value,
      },
    });
  }
}
