/*
  Warnings:

  - You are about to drop the column `managerId` on the `OrderTransaction` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'IN_CART';

-- DropForeignKey
ALTER TABLE "OrderTransaction" DROP CONSTRAINT "OrderTransaction_managerId_fkey";

-- AlterTable
ALTER TABLE "OrderTransaction" DROP COLUMN "managerId";
