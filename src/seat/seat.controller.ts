import { Controller, Get, Param } from '@nestjs/common';
import { SeatService } from './seat.service';

@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get()
  getSeats() {
    return this.seatService.getSeats();
  }

  @Get(':seat_id')
  getSeatBySeatId(@Param('seat_id') seat_id) {
    return this.seatService.getSeatBySeatId(seat_id);
  }
}
