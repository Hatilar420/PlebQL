-- DropIndex
DROP INDEX "user_username_key";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE TEXT;
