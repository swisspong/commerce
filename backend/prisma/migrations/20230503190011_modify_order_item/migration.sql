/*
  Warnings:

  - You are about to drop the `OrderItemReserved` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderItemReserved` DROP FOREIGN KEY `OrderItemReserved_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItemReserved` DROP FOREIGN KEY `OrderItemReserved_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItemReserved` DROP FOREIGN KEY `OrderItemReserved_vrnt_id_fkey`;

-- DropTable
DROP TABLE `OrderItemReserved`;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `vrnt_id` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `subtotal` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `Variant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
