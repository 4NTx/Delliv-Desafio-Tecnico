/*
  Warnings:

  - Added the required column `cargo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CargoUsuario" AS ENUM ('VENDEDOR', 'USUARIO', 'ADMIN');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "cargo" "CargoUsuario" NOT NULL;
