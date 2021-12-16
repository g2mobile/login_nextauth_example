-- CreateTable
CREATE TABLE "Assunto" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Assunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAssunto" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "assuntoId" TEXT NOT NULL,

    CONSTRAINT "SubAssunto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubAssunto" ADD CONSTRAINT "SubAssunto_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "Assunto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
