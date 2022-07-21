/*
  Warnings:

  - A unique constraint covering the columns `[playerId,seasonId]` on the table `SeasonPlayer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SeasonPlayer_playerId_seasonId_key" ON "SeasonPlayer"("playerId", "seasonId");
