/*
  Warnings:

  - A unique constraint covering the columns `[vendorId,userId]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Manager_vendorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Manager_vendorId_userId_key" ON "Manager"("vendorId", "userId");
