/*
  Warnings:

  - You are about to drop the column `name` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `experiences` table. All the data in the column will be lost.
  - Added the required column `company_name` to the `experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "educations" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "company",
ADD COLUMN     "company_name" TEXT NOT NULL;
