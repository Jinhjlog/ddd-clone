import { Module, Provider } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from './infra';
import { USER_REPOSITORY } from './user.constants';
import { CreateUserUsecase, SignInUsecase } from './useCase';

const useCase: Provider[] = [CreateUserUsecase, SignInUsecase];

@Module({
  controllers: [UserController],
  providers: [
    ...useCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
