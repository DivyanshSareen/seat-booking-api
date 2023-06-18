import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeatService {
  constructor(private prisma: PrismaService) {}
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
    });
    const seat_pricing_id = seat_details.pricingId;
    const pricing_details = await this.prisma.pricing.findUnique({
      where: {
        id: seat_pricing_id,
      },
    });

    const no_of_seats = await this.prisma.seat.count({
      where: {
        pricingId: seat_pricing_id,
      },
    });
    const no_of_booked_seats = await this.prisma.seat.count({
      where: {
        pricingId: seat_pricing_id,
        isBooked: true,
      },
    });

    console.log(
      this.seatPricingReducer({
        no_of_booked_seats,
        no_of_seats,
        min_price: pricing_details.min_pricing,
        normal_price: pricing_details.normal_pricing,
        max_price: pricing_details.max_pricing,
      }),
    );
    return seat_details;
  }

  seatPricingReducer({
    no_of_booked_seats,
    no_of_seats,
    min_price,
    normal_price,
    max_price,
  }) {
    const percent_booked = (no_of_booked_seats / no_of_seats) * 100;

    if (percent_booked < 40) {
      return min_price || normal_price || max_price;
    } else if (percent_booked < 60) {
      return normal_price || max_price;
    } else {
      return max_price || normal_price;
    }
  }
}
