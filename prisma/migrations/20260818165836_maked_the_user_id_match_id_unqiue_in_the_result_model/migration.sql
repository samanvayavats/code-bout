/*
  Warnings:

  - A unique constraint covering the columns `[match_Id,user_Id]` on the table `Results` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Results_match_Id_user_Id_key" ON "Results"("match_Id", "user_Id");
