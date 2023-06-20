import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { HelperController } from './helper.controller';

@Global()
@Module({
  controllers: [HelperController],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
