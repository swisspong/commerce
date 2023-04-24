-- DropForeignKey
ALTER TABLE `option` DROP FOREIGN KEY `Option_vgrp_id_fkey`;

-- AlterTable
ALTER TABLE `option` MODIFY `vgrp_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_vgrp_id_fkey` FOREIGN KEY (`vgrp_id`) REFERENCES `VariantGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
