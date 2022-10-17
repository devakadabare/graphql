-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address1` VARCHAR(191) NOT NULL,
    `address2` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `countryId` INTEGER NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL,

    UNIQUE INDEX `Person_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `contact` DOUBLE NOT NULL,
    `role` ENUM('ADMIN', 'DOCTOR', 'PARENT', 'CHILDREN', 'HOSPITAL_ADMIN', 'VACCINATION_CENTER_ADMIN') NOT NULL DEFAULT 'PARENT',
    `status` ENUM('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `isoCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Country_name_key`(`name`),
    UNIQUE INDEX `Country_code_key`(`code`),
    UNIQUE INDEX `Country_isoCode_key`(`isoCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
