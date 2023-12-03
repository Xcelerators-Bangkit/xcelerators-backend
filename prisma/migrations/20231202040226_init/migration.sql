-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `source_url` VARCHAR(191) NOT NULL,
    `content` VARCHAR(15000) NOT NULL,
    `image_url` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mountain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `about` VARCHAR(500) NOT NULL,
    `elevation` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(256) NOT NULL,
    `price` INTEGER NOT NULL,
    `open_status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `mountain_id` INTEGER NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `total_price` INTEGER NOT NULL,
    `date` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(1000) NOT NULL,
    `identity_type` VARCHAR(50) NOT NULL,
    `identity_number` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birthdate` DATE NOT NULL,
    `address` VARCHAR(256) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_mountain_id_fkey` FOREIGN KEY (`mountain_id`) REFERENCES `mountain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_user_email_fkey` FOREIGN KEY (`user_email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
