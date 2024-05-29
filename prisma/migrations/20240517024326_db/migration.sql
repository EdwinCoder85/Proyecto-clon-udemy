/*
  Warnings:

  - You are about to drop the column `subscriptionPlanId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_subscriptionPlanId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionPlanId",
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT,
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionProvider" TEXT,
ADD COLUMN     "userSubscriptionId" INTEGER;
