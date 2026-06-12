/*
  Warnings:

  - The `started_At` column on the `Matches` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ended_At` column on the `Matches` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `submitted_at` column on the `submissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `elo_ranking` on the `LeaderBoard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `player_Id_One` on table `Matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `player_Id_Two` on table `Matches` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eloRating` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `looses` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wins` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `exec_time_ms` on the `submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `memory_kb` on the `submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_player_Id_One_fkey";

-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_player_Id_Two_fkey";

-- AlterTable
ALTER TABLE "LeaderBoard" DROP COLUMN "elo_ranking",
ADD COLUMN     "elo_ranking" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Matches" ALTER COLUMN "player_Id_One" SET NOT NULL,
ALTER COLUMN "player_Id_Two" SET NOT NULL,
DROP COLUMN "started_At",
ADD COLUMN     "started_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "ended_At",
ADD COLUMN     "ended_At" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "eloRating" SET NOT NULL,
ALTER COLUMN "eloRating" SET DEFAULT 1200,
ALTER COLUMN "looses" SET NOT NULL,
ALTER COLUMN "looses" SET DEFAULT 0,
ALTER COLUMN "wins" SET NOT NULL,
ALTER COLUMN "wins" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "is_final" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "exec_time_ms",
ADD COLUMN     "exec_time_ms" INTEGER NOT NULL,
DROP COLUMN "memory_kb",
ADD COLUMN     "memory_kb" INTEGER NOT NULL,
DROP COLUMN "submitted_at",
ADD COLUMN     "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_player_Id_One_fkey" FOREIGN KEY ("player_Id_One") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_player_Id_Two_fkey" FOREIGN KEY ("player_Id_Two") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
