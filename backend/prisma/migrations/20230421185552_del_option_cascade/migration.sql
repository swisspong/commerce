/*
  Warnings:

  - Added the required column `expiredAt` to the `OrderItemReserved` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `option` DROP FOREIGN KEY `Option_vgrp_id_fkey`;

-- AlterTable
ALTER TABLE `orderitemreserved` ADD COLUMN `expiredAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_vgrp_id_fkey` FOREIGN KEY (`vgrp_id`) REFERENCES `VariantGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
