-- AlterTable
ALTER TABLE `OrderItemReserved` ADD COLUMN `vrnt_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `OrderItemReserved` ADD CONSTRAINT `OrderItemReserved_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `Variant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
