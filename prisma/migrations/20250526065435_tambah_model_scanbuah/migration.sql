-- CreateTable
CREATE TABLE "ScanBuah" (
    "id" TEXT NOT NULL,
    "predictedBuahName" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "buahId" TEXT,

    CONSTRAINT "ScanBuah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScanBuah_userId_idx" ON "ScanBuah"("userId");

-- CreateIndex
CREATE INDEX "ScanBuah_buahId_idx" ON "ScanBuah"("buahId");

-- AddForeignKey
ALTER TABLE "ScanBuah" ADD CONSTRAINT "ScanBuah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanBuah" ADD CONSTRAINT "ScanBuah_buahId_fkey" FOREIGN KEY ("buahId") REFERENCES "Buah"("id") ON DELETE SET NULL ON UPDATE CASCADE;
