/*
  Warnings:

  - You are about to drop the column `productoId` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productoId_fkey";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "productoId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
