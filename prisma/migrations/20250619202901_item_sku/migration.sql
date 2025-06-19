/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_sku_key" ON "Item"("sku");
