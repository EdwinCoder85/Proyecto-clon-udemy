/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `CourseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CourseCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_userId_fkey";

-- AlterTable
ALTER TABLE "CourseCategory" DROP COLUMN "updatedAt",
DROP COLUMN "userId";
