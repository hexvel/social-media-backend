/*
  Warnings:

  - You are about to drop the column `activationCode` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `activationCode`,
    ADD COLUMN `activationLink` VARCHAR(191) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;
