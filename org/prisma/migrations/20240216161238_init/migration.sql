/*
  Warnings:

  - You are about to alter the column `type` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `first_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `type` ENUM('admin', 'customer') NOT NULL,
    MODIFY `first_name` VARCHAR(191) NOT NULL,
    MODIFY `last_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `datasheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeName` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `payType` VARCHAR(191) NOT NULL,
    `hours` VARCHAR(191) NULL,
    `weeksReporting` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `finalDate` DATETIME(3) NOT NULL,
    `note` VARCHAR(191) NULL,
    `grossWage` DOUBLE NOT NULL,
    `payRate` ENUM('hourly', 'salary') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `datasheet` ADD CONSTRAINT `datasheet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
