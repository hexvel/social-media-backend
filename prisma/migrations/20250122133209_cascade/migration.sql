/*
  Warnings:

  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_postId_fkey`;

-- DropIndex
DROP INDEX `photos_postId_fkey` ON `photos`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `isActive`;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
