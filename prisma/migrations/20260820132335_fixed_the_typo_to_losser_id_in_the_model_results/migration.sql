/*
  Warnings:

  - You are about to drop the column `loser_Id` on the `Results` table. All the data in the column will be lost.
  - Added the required column `losser_Id` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_loser_Id_fkey";

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "loser_Id",
ADD COLUMN     "losser_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_losser_Id_fkey" FOREIGN KEY ("losser_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
