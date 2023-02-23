/*
  Warnings:

  - You are about to drop the column `icone` on the `portfolios` table. All the data in the column will be lost.
  - Added the required column `icon` to the `portfolios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "portfolios" DROP COLUMN "icone",
ADD COLUMN     "icon" TEXT NOT NULL;
