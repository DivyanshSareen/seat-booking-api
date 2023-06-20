import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helper: HelperService,
  ) {}
  async createBooking(body) {
    const seat_details = await this.getSeatsDetails(body.seats);

    try {
      if (!this.checkSeatAvailability(seat_details)) {
        throw new HttpException(
          `Seat(s) already booked`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      return e;
    }

    const booking_amount = await this.calculateBookingCost(seat_details);

    try {
      const booking_details = await this.prisma.booking.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          booking_amount: booking_amount,
          seats: {
            connect: [
              ...seat_details.map((seat) => {
                return { id: seat.id };
              }),
            ],
          },
        },
      });
      return { id: booking_details.id, total_amount: booking_amount };
    } catch (e) {
      return e;
    }
  }

  async getBookingByUserId(userId) {
    const search_result = await this.prisma.booking.findMany({
      where: {
        OR: [{ email: userId }, { phone: userId }],
      },
      include: {
        seats: true,
      },
    });
    if (search_result.length === 0) {
      return { message: 'No bookings by given user' };
    } else {
      return search_result;
    }
  }

  async getSeatsDetails(seat_id_list) {
    return await this.prisma.seat.findMany({
      where: { seat_number: { in: seat_id_list } },
      include: {
        pricing: true,
      },
    });
  }

  async calculateBookingCost(seat_details) {
    const seat_pricing_list = await Promise.all(
      seat_details.map(async (seat) => {
        return await this.helper.getSeatPricing({
          seat_pricing_id: seat.pricingId,
          min_price: seat.pricing.min_pricing,
          normal_price: seat.pricing.normal_pricing,
          max_price: seat.pricing.max_pricing,
        });
      }),
    );

    const pricing = seat_pricing_list.reduce((total, seat_price) => {
      return parseFloat(total) + parseFloat(seat_price);
    }, 0);

    return pricing;
  }

  checkSeatAvailability(seat_details) {
    return seat_details.reduce((acc, seat) => !seat.bookingId && acc, true);
  }
}
