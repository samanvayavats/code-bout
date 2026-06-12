-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_player_Id_One_fkey";

-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_player_Id_Two_fkey";

-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_winner_Id_fkey";

-- AlterTable
ALTER TABLE "Matches" ALTER COLUMN "player_Id_One" DROP NOT NULL,
ALTER COLUMN "player_Id_Two" DROP NOT NULL,
ALTER COLUMN "winner_Id" DROP NOT NULL,
ALTER COLUMN "winner_Id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_player_Id_One_fkey" FOREIGN KEY ("player_Id_One") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_player_Id_Two_fkey" FOREIGN KEY ("player_Id_Two") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_winner_Id_fkey" FOREIGN KEY ("winner_Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
