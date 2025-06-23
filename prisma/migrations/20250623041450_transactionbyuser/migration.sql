/*
  Warnings:

  - You are about to drop the column `updatedManagerId` on the `OrderTransaction` table. All the data in the column will be lost.
  - Added the required column `updatedByUserId` to the `OrderTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderTransaction" DROP CONSTRAINT "OrderTransaction_updatedManagerId_fkey";

-- AlterTable
ALTER TABLE "OrderTransaction" DROP COLUMN "updatedManagerId",
ADD COLUMN     "managerId" TEXT,
ADD COLUMN     "updatedByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTransaction" ADD CONSTRAINT "OrderTransaction_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
