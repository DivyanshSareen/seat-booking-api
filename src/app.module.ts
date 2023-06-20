import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatModule } from './seat/seat.module';
import { PricingModule } from './pricing/pricing.module';
import { BookingModule } from './booking/booking.module';
import { HelperModule } from './helper/helper.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    SeatModule,
    PricingModule,
    BookingModule,
    HelperModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
