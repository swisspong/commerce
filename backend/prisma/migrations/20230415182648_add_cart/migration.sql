/*
  Warnings:

  - Added the required column `updated_at` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `variant` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` VARCHAR(191) NOT NULL,
    `prod_id` VARCHAR(191) NOT NULL,
    `quantitiy` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItemVariant` (
    `id` VARCHAR(191) NOT NULL,
    `cart_item_id` VARCHAR(191) NOT NULL,
    `vrnt_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_prod_id_fkey` FOREIGN KEY (`prod_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItemVariant` ADD CONSTRAINT `CartItemVariant_cart_item_id_fkey` FOREIGN KEY (`cart_item_id`) REFERENCES `CartItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItemVariant` ADD CONSTRAINT `CartItemVariant_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `Variant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
