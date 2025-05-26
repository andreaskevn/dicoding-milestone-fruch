-- CreateTable
CREATE TABLE "Buah" (
    "id" TEXT NOT NULL,
    "namaBuah" TEXT NOT NULL,
    "manfaat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buah_namaBuah_key" ON "Buah"("namaBuah");
