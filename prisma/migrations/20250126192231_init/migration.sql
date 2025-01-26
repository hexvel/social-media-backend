/*
  Warnings:

  - Added the required column `creatorId` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `conversations` ADD COLUMN `creatorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
