import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DOMPurifyProvider } from './providers/dompurify.provider';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [DOMPurifyProvider],
  exports: [DOMPurifyProvider],
})
export class CoreModule {}
