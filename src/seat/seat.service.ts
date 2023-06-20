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
    const seat_details = await this.prisma.seat.findMany({
      select: { seat_number: true, bookingId: true, pricing: true },
      orderBy: {
        pricing: {
          pricing_class: 'asc',
        },
      },
    });
    return seat_details.map((seat) => {
      return {
        seat_number: seat.seat_number,
        isBooked: !!seat.bookingId,
        pricing_class: seat.pricing.pricing_class,
      };
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
    return {
      seat_number: seat_details.seat_number,
      seat_pricing: seat_pricing,
      seat_class: seat_details.pricing.pricing_class,
      isBooked: !!seat_details.bookingId,
    };
  }
}
