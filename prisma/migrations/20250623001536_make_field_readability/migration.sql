/*
  Warnings:

  - You are about to drop the column `purchaseOrderId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `vendorItemId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseOrderId` on the `OrderTransaction` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_vendorItemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderTransaction" DROP CONSTRAINT "OrderTransaction_purchaseOrderId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "purchaseOrderId",
DROP COLUMN "vendorItemId",
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderTransaction" DROP COLUMN "purchaseOrderId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
