-- AlterTable
ALTER TABLE "User" ADD COLUMN     "secretAccessToken" TEXT;

-- AlterTable
ALTER TABLE "VendorItem" ALTER COLUMN "categoryId" DROP NOT NULL;
