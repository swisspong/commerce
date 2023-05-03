-- CreateTable
CREATE TABLE `asset` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `file_size` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asset_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` VARCHAR(191) NULL,
    `image_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_asset_product_id_image_id_key`(`product_id`, `image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_asset` ADD CONSTRAINT `product_asset_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_asset` ADD CONSTRAINT `product_asset_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
