-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bankAccounts" (
    "id" SERIAL NOT NULL,
    "bankNumber" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "bankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "bankAccounts_bankNumber_key" ON "bankAccounts"("bankNumber");

-- AddForeignKey
ALTER TABLE "bankAccounts" ADD CONSTRAINT "bankAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
