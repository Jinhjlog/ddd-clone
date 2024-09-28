import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, UserModule],
})
export class AppModule {}
