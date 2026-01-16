import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma";
import bcrypt from "bcrypt";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db"
})


// Deixe o construtor vazio. O Prisma 6+ lerá o prisma.config.ts automaticamente
export const prisma =
  globalForPrisma.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
async function seedAdmin() {
  try {
    const adminExists = await prisma.admin.findFirst();
    
    if (!adminExists) {
      // Gerar o hash da senha (10 rounds de salt é o padrão seguro)
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await prisma.admin.create({
        data: {
          username: "admin",
          password: hashedPassword, 
        },
      });
      console.log("✅ Admin criado com senha criptografada.");
    }
  } catch (error) {
    console.error("❌ Erro no seed do admin:", error);
  }
}

seedAdmin();

// Executa a verificação apenas uma vez na inicialização do servidor
seedAdmin();