/*
  Warnings:

  - A unique constraint covering the columns `[vendorId,itemId]` on the table `VendorItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VendorItem_vendorId_itemId_key" ON "VendorItem"("vendorId", "itemId");
