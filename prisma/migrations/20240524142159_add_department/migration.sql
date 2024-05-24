/*
  Warnings:

  - Added the required column `department` to the `HealthcareProvider` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HealthCareProviderDepartment" AS ENUM ('doctor', 'pharmacist', 'nurse', 'optometrist', 'dietician');

-- AlterTable
ALTER TABLE "HealthcareProvider" ADD COLUMN     "department" "HealthCareProviderDepartment" NOT NULL;
