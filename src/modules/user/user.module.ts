import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  controllers: [UserController],
})
export class UserModule {}
