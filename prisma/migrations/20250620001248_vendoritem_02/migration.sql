/*
  Warnings:

  - You are about to drop the column `itemId` on the `VendorItem` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sku]` on the table `VendorItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendorId,sku]` on the table `VendorItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `VendorItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `VendorItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VendorItem" DROP CONSTRAINT "VendorItem_itemId_fkey";

-- DropIndex
DROP INDEX "VendorItem_vendorId_itemId_key";

-- AlterTable
ALTER TABLE "VendorItem" DROP COLUMN "itemId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "vendorItemId" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorItem_sku_key" ON "VendorItem"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "VendorItem_vendorId_sku_key" ON "VendorItem"("vendorId", "sku");

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_vendorItemId_fkey" FOREIGN KEY ("vendorItemId") REFERENCES "VendorItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
