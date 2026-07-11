/*
  Warnings:

  - Added the required column `matchName` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "matchName" TEXT NOT NULL;
