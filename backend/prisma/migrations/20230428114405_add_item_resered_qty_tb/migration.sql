/*
  Warnings:

  - You are about to alter the column `quantity` on the `ItemReserved` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `permission_id` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ItemReserved` MODIFY `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `permission_id`;
