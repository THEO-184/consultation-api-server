/*
  Warnings:

  - A unique constraint covering the columns `[healthFacilityId]` on the table `Officer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `healthFacilityId` to the `HealthcareProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthFacilityId` to the `Officer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HealthcareProvider" ADD COLUMN     "healthFacilityId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Officer" ADD COLUMN     "healthFacilityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "HealthFacility" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "HealthFacility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Officer_healthFacilityId_key" ON "Officer"("healthFacilityId");

-- AddForeignKey
ALTER TABLE "Officer" ADD CONSTRAINT "Officer_healthFacilityId_fkey" FOREIGN KEY ("healthFacilityId") REFERENCES "HealthFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthcareProvider" ADD CONSTRAINT "HealthcareProvider_healthFacilityId_fkey" FOREIGN KEY ("healthFacilityId") REFERENCES "HealthFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
