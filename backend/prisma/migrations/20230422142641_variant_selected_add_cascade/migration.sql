-- DropForeignKey
ALTER TABLE `variantselected` DROP FOREIGN KEY `VariantSelected_vrnt_id_fkey`;

-- AddForeignKey
ALTER TABLE `VariantSelected` ADD CONSTRAINT `VariantSelected_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `Variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
