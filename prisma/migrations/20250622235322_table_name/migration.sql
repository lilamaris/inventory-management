/*
  Warnings:

  - You are about to drop the `PurchaseOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseOrderTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendorCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendorItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VendorManager` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'REJECTED', 'CANCELLED', 'APPROVED', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_orderByUserId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderItem" DROP CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderItem" DROP CONSTRAINT "PurchaseOrderItem_vendorItemId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderTransaction" DROP CONSTRAINT "PurchaseOrderTransaction_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderTransaction" DROP CONSTRAINT "PurchaseOrderTransaction_updatedManagerId_fkey";

-- DropForeignKey
ALTER TABLE "VendorItem" DROP CONSTRAINT "VendorItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "VendorItem" DROP CONSTRAINT "VendorItem_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "VendorManager" DROP CONSTRAINT "VendorManager_userId_fkey";

-- DropForeignKey
ALTER TABLE "VendorManager" DROP CONSTRAINT "VendorManager_vendorId_fkey";

-- DropTable
DROP TABLE "PurchaseOrder";

-- DropTable
DROP TABLE "PurchaseOrderItem";

-- DropTable
DROP TABLE "PurchaseOrderTransaction";

-- DropTable
DROP TABLE "VendorCategory";

-- DropTable
DROP TABLE "VendorItem";

-- DropTable
DROP TABLE "VendorManager";

-- DropEnum
DROP TYPE "PurchaseOrderStatus";

-- CreateTable
CREATE TABLE "Manager" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "vendorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderByUserId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderTransaction" (
    "id" TEXT NOT NULL,
    "transactionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchaseOrderId" TEXT NOT NULL,
    "previousStatus" "OrderStatus" NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "updatedManagerId" TEXT NOT NULL,

    CONSTRAINT "OrderTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "purchaseOrderId" TEXT NOT NULL,
    "vendorItemId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_vendorId_key" ON "Manager"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_sku_key" ON "Item"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Item_vendorId_sku_key" ON "Item"("vendorId", "sku");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderByUserId_fkey" FOREIGN KEY ("orderByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_updatedManagerId_fkey" FOREIGN KEY ("updatedManagerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_vendorItemId_fkey" FOREIGN KEY ("vendorItemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
