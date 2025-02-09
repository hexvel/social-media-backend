/*
  Warnings:

  - You are about to drop the column `activationLink` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `activationLink`,
    ADD COLUMN `activationCode` VARCHAR(191) NULL;
