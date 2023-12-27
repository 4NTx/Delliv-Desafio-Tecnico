/*
  Warnings:

  - Added the required column `item` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "item" TEXT NOT NULL,
ALTER COLUMN "nomeCliente" DROP NOT NULL;
