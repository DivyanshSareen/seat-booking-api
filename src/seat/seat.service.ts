import { Injectable } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: HelperService,
  ) {}
  async getSeats() {
    return await this.prisma.seat.findMany({
      select: { seat_number: true, isBooked: true },
    });
  }

  async getSeatBySeatId(seat_id) {
    const seat_details = await this.prisma.seat.findUnique({
      where: {
        seat_number: seat_id,
      },
      include: {
        pricing: true,
      },
    });
    const seat_pricing_id = seat_details.pricingId;

    const seat_pricing = await this.helper.getSeatPricing({
      seat_pricing_id,
      min_price: seat_details.pricing.min_pricing,
      normal_price: seat_details.pricing.normal_pricing,
      max_price: seat_details.pricing.max_pricing,
    });
    return { ...seat_details, seat_pricing: seat_pricing };
  }
}
