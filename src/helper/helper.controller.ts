import { Controller, Get } from '@nestjs/common';
import { HelperService } from './helper.service';

@Controller('helper')
export class HelperController {
  constructor(private readonly helperService: HelperService) {}

  @Get('/upload/pricing')
  upload() {
    return this.helperService.pricingUpload();
  }

  @Get('/upload/seat')
  seatUpload() {
    return this.helperService.seatUpload();
  }
}
