-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `author` VARCHAR(191) NOT NULL,
    `reviewer` VARCHAR(191) NOT NULL,
    `star` INTEGER NOT NULL,
    `read` INTEGER NOT NULL,
    `status` ENUM('Drafted', 'Published') NOT NULL DEFAULT 'Drafted',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Article_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
