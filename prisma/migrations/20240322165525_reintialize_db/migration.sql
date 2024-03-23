/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(190)` to `VarChar(50)`.
  - You are about to alter the column `description` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10000)` to `VarChar(1000)`.
  - You are about to alter the column `image` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `title` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(1000) NOT NULL,
    MODIFY `image` VARCHAR(100) NOT NULL;
