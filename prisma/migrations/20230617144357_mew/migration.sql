-- AlterTable
ALTER TABLE "Pricing" ALTER COLUMN "min_pricing" DROP NOT NULL,
ALTER COLUMN "normal_pricing" DROP NOT NULL,
ALTER COLUMN "max_prcing" DROP NOT NULL;
