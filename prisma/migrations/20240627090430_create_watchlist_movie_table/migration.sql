/*
  Warnings:

  - You are about to drop the column `watchlistId` on the `Movie` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "WatchlistMovie" (
    "watchlistId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    PRIMARY KEY ("watchlistId", "movieId"),
    CONSTRAINT "WatchlistMovie_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "Watchlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WatchlistMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("tmdbId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "poster" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("poster", "title", "tmdbId", "year") SELECT "poster", "title", "tmdbId", "year" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
