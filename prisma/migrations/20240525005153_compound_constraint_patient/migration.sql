/*
  Warnings:

  - A unique constraint covering the columns `[id,email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Patient_id_email_key" ON "Patient"("id", "email");
