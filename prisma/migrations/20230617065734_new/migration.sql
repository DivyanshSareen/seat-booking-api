/*
  Warnings:

  - You are about to drop the column `seat_class` on the `Seat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_bookingId_fkey";

-- AlterTable
ALTER TABLE "Pricing" ALTER COLUMN "min_pricing" DROP NOT NULL,
ALTER COLUMN "normal_pricing" DROP NOT NULL,
ALTER COLUMN "max_prcing" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "seat_class",
ALTER COLUMN "bookingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
