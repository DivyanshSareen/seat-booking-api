import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatModule } from './seat/seat.module';
import { PricingModule } from './pricing/pricing.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [SeatModule, PricingModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
