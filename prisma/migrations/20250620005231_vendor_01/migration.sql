/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `orderByUserId` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PurchaseOrderStatus" AS ENUM ('PENDING', 'REJECTED', 'CANCELLED', 'APPROVED', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_ownerId_fkey";

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "orderByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "VendorManager" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "VendorManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderTransaction" (
    "id" TEXT NOT NULL,
    "transactionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchaseOrderId" TEXT NOT NULL,
    "status" "PurchaseOrderStatus" NOT NULL,
    "updatedManagerId" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrderTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorManager_userId_vendorId_key" ON "VendorManager"("userId", "vendorId");

-- AddForeignKey
ALTER TABLE "VendorManager" ADD CONSTRAINT "VendorManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorManager" ADD CONSTRAINT "VendorManager_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_orderByUserId_fkey" FOREIGN KEY ("orderByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderTransaction" ADD CONSTRAINT "PurchaseOrderTransaction_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderTransaction" ADD CONSTRAINT "PurchaseOrderTransaction_updatedManagerId_fkey" FOREIGN KEY ("updatedManagerId") REFERENCES "VendorManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;
