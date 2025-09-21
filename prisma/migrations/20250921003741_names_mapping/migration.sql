/*
  Warnings:

  - You are about to drop the column `clientId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ammountLimit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `timeRangeLimit` on the `Product` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client_id" TEXT NOT NULL,
    "products" JSONB NOT NULL
);
INSERT INTO "new_Invoice" ("id", "products") SELECT "id", "products" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "ammount_limit" INTEGER NOT NULL DEFAULT 0,
    "time_range_limit" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Product" ("description", "id", "name", "price", "stock") SELECT "description", "id", "name", "price", "stock" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
