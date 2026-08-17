-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "user_Id" TEXT NOT NULL,
    "winner_Id" TEXT NOT NULL,
    "loser_Id" TEXT NOT NULL,
    "match_Id" TEXT NOT NULL,
    "average_Verdict" INTEGER NOT NULL,
    "average_exec_time_ms" DECIMAL(65,30) NOT NULL,
    "average_memory_kb" DECIMAL(65,30) NOT NULL,
    "submission_Time" TEXT NOT NULL,
    "pointCount" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_winner_Id_fkey" FOREIGN KEY ("winner_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_loser_Id_fkey" FOREIGN KEY ("loser_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_match_Id_fkey" FOREIGN KEY ("match_Id") REFERENCES "Matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
