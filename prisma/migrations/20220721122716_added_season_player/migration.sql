-- CreateTable
CREATE TABLE "SeasonPlayer" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "SeasonPlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeasonPlayer" ADD CONSTRAINT "SeasonPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonPlayer" ADD CONSTRAINT "SeasonPlayer_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
