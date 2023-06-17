/*
  Warnings:

  - You are about to drop the column `max_prcing` on the `Pricing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "max_prcing",
ADD COLUMN     "max_pricing" DECIMAL(12,2);
