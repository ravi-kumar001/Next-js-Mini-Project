/*
  Warnings:

  - You are about to drop the column `createAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `createAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `title` VARCHAR(190) NOT NULL,
    MODIFY `description` VARCHAR(10000) NOT NULL,
    MODIFY `image` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `image` VARCHAR(191) NULL;
