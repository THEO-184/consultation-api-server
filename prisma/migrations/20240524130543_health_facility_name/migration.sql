/*
  Warnings:

  - Added the required column `name` to the `HealthFacility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthFacility" ADD COLUMN     "name" TEXT NOT NULL;
