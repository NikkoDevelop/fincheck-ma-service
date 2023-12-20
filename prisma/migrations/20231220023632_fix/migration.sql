-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_expenseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_incomeCategoryId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "incomeCategoryId" DROP NOT NULL,
ALTER COLUMN "expenseCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_incomeCategoryId_fkey" FOREIGN KEY ("incomeCategoryId") REFERENCES "IncomeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
