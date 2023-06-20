/*
  Warnings:

  - You are about to alter the column `booking_amount` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Decimal(12,2)`.
  - A unique constraint covering the columns `[email]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Made the column `normal_pricing` on table `Pricing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "booking_amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Pricing" ALTER COLUMN "normal_pricing" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_email_key" ON "Booking"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_phone_key" ON "Booking"("phone");
