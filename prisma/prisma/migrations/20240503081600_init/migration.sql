/*
  Warnings:

  - You are about to drop the column `quantity` on the `Stock` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Stock" ("id", "title", "uuid") SELECT "id", "title", "uuid" FROM "Stock";
DROP TABLE "Stock";
ALTER TABLE "new_Stock" RENAME TO "Stock";
CREATE UNIQUE INDEX "Stock_uuid_key" ON "Stock"("uuid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
