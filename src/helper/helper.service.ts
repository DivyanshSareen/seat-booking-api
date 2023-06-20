import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HelperService {
  constructor(private prisma: PrismaService) {}
  async pricingUpload() {
    const csvFilePath = path.resolve(
      '/home/divyansh/seat-booking-api/src/helper/pricing.csv',
    );

    const headers = [
      'id',
      'seat_class',
      'min_price',
      'normal_price',
      'max_price',
    ];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      async (error, result) => {
        if (error) {
          console.error(error);
        }
        const records = [];
        result.shift();
        for (const x of result) {
          const rec = {
            pricing_class: x.seat_class,
            min_pricing:
              x.min_price
                .split('')
                .filter((e) => e !== '$')
                .join('') || null,
            normal_pricing:
              x.normal_price
                .split('')
                .filter((e) => e !== '$')
                .join('') || null,
            max_pricing:
              x.max_price
                .split('')
                .filter((e) => e !== '$')
                .join('') || null,
          };
          const createUser = await this.prisma.pricing.create({ data: rec });
        }
      },
    );

    return fileContent;
  }

  seatUpload() {
    const csvFilePath = path.resolve(
      '/home/divyansh/seat-booking-api/src/helper/seats.csv',
    );

    const headers = ['id', 'seat_identifier', 'seat_class'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    const hmap = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      J: 10,
    };
    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
      },
      async (error, result) => {
        if (error) {
          console.error(error);
        }
        result.shift();
        for (const x of result) {
          const rec = {
            id: parseInt(x.id),
            seat_number: x.seat_identifier,
            pricingId: hmap[x.seat_class],
          };
          const createUser = await this.prisma.seat.create({ data: rec });
        }
      },
    );

    return fileContent;
  }

  async getSeatPricing({
    seat_pricing_id,
    min_price,
    normal_price,
    max_price,
  }) {
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
    const percent_booked = (no_of_booked_seats / no_of_seats) * 100;

    if (percent_booked < 40) {
      return min_price || normal_price;
    } else if (percent_booked < 60) {
      return normal_price || max_price;
    } else {
      return max_price || normal_price;
    }
  }
}
