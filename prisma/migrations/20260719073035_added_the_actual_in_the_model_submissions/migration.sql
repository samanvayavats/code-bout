/*
  Warnings:

  - Added the required column `actual` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "actual" TEXT NOT NULL;
