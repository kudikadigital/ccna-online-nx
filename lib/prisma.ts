import { PrismaClient } from "./generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcrypt";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const setupPrisma = () => {
  const url = process.env.DATABASE_URL || "file:./dev.db";
  
  // LÓGICA PARA PRODUÇÃO (TURSO)
  if (url.startsWith("libsql://") || url.startsWith("wss://")) {
    const config = {
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    };

    // No Prisma 7, se o construtor pede Config, 
    // instanciamos o adaptador passando o objeto de configuração diretamente.
    const adapter = new PrismaLibSql(config); 
    return new PrismaClient({ adapter: adapter as any });
  }

  // LÓGICA PARA DESENVOLVIMENTO (SQLITE)
  // Nota: Para o Prisma 7, não precisamos de passar adaptador para SQLite local
  // Ele usa o motor nativo ultra-rápido.
  return new PrismaClient();
};

export const prisma = globalForPrisma.prisma || setupPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// --- Auto-Seed Admin ---
async function seedAdmin() {
  try {
    const adminExists = await prisma.admin.findFirst();
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await prisma.admin.create({
        data: {
          username: "admin",
          password: hashedPassword,
        },
      });
      console.log("✅ Admin verificado/criado.");
    }
  } catch (error) {
    console.error("ERRO_AO_VERIFICAR_ADMIN:", error);
    // Silencia erros no build da Vercel
  }
}

seedAdmin();