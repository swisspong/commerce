/*
  Warnings:

  - Added the required column `prod_id` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `variant` ADD COLUMN `prod_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Variant` ADD CONSTRAINT `Variant_prod_id_fkey` FOREIGN KEY (`prod_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
