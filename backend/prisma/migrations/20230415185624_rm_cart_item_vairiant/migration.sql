/*
  Warnings:

  - You are about to drop the `cartitemvariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartitemvariant` DROP FOREIGN KEY `CartItemVariant_cart_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `cartitemvariant` DROP FOREIGN KEY `CartItemVariant_vrnt_id_fkey`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `vrnt_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `cartitemvariant`;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `Variant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
