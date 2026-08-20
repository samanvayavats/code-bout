-- AlterTable
ALTER TABLE "Matches" ADD COLUMN     "losser_Id" TEXT;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_losser_Id_fkey" FOREIGN KEY ("losser_Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
