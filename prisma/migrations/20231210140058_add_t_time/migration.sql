/*
  Warnings:

  - You are about to drop the column `transaction_time` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `transaction_time`,
    ADD COLUMN `t_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
