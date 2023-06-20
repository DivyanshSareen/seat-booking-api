import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() body) {
    return this.bookingService.createBooking(body);
  }

  @Get()
  async getBookingbyUserId(@Query('userId') userId) {
    if (!userId) {
      throw new BadRequestException('Email or phone number must be provided');
    }
    return this.bookingService.getBookingByUserId(userId);
  }
}
