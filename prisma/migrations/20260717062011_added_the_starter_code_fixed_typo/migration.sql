/*
  Warnings:

  - You are about to drop the column `diffculty` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `looses` on the `User` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starter_code` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "diffculty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL,
ADD COLUMN     "starter_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "looses",
ADD COLUMN     "losses" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "Diffculty";
