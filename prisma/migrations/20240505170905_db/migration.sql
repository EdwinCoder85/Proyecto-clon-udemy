/*
  Warnings:

  - The primary key for the `CourseCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CourseCategory_id_seq";
