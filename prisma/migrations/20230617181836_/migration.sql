/*
  Warnings:

  - You are about to drop the column `prcingId` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `pricingId` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_prcingId_fkey";

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "prcingId",
ADD COLUMN     "pricingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_pricingId_fkey" FOREIGN KEY ("pricingId") REFERENCES "Pricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
