/*
  Warnings:

  - You are about to drop the column `price` on the `PurchaseOrderItem` table. All the data in the column will be lost.
  - Added the required column `previousStatus` to the `PurchaseOrderTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "status" "PurchaseOrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "PurchaseOrderItem" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "PurchaseOrderTransaction" ADD COLUMN     "previousStatus" "PurchaseOrderStatus" NOT NULL;
