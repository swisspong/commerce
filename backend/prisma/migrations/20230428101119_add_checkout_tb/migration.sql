-- CreateTable
CREATE TABLE `Checkout` (
    `id` VARCHAR(191) NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemReserved` (
    `id` VARCHAR(191) NOT NULL,
    `chkt_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NULL,
    `vrnt_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemReserved` ADD CONSTRAINT `ItemReserved_chkt_id_fkey` FOREIGN KEY (`chkt_id`) REFERENCES `Checkout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemReserved` ADD CONSTRAINT `ItemReserved_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemReserved` ADD CONSTRAINT `ItemReserved_vrnt_id_fkey` FOREIGN KEY (`vrnt_id`) REFERENCES `Variant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
