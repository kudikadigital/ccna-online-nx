// app/api/leads/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 Body recebido:", body);

    // VALIDAR CAMPOS OBRIGATÓRIOS
    if (!body.nome || !body.email || !body.whatsapp) {
      return NextResponse.json(
        { error: "Nome, email e WhatsApp são obrigatórios" },
        { status: 400 },
      );
    }

    try {
      // TENTATIVA 1: Com todos os campos (incluindo perfil)
      const lead = await prisma.lead.create({
        data: {
          nome: body.nome,
          email: body.email,
          whatsapp: body.whatsapp,
          perfil: body.perfil || null, // ← CAMPO NOVO
          objetivo: body.objetivo || null,
          experiencia: body.experiencia || null,
          profissao: body.profissao || null,
          empresa: body.empresa || null,
          cargo: body.cargo || null,
          plano: "pendente",
          status: "lead",
        },
      });

      console.log("✅ Lead criado com ID:", lead.id);

      return NextResponse.json(
        {
          leadId: lead.id,
          message: "Lead criado com sucesso",
        },
        { status: 201 },
      );
    } catch {
      console.log("🔄 Tentativa 1 falhou, tentando sem campo perfil...");

      // TENTATIVA 2: Sem o campo perfil (fallback)
      const lead = await prisma.lead.create({
        data: {
          nome: body.nome,
          email: body.email,
          whatsapp: body.whatsapp,
          // Omitir perfil se não existir
          objetivo: body.objetivo || null,
          experiencia: body.experiencia || null,
          profissao: body.profissao || null,
          empresa: body.empresa || null,
          cargo: body.cargo || null,
          plano: "pendente",
          status: "lead",
        },
      });

      console.log("✅ Lead criado (sem perfil) com ID:", lead.id);

      return NextResponse.json(
        {
          leadId: lead.id,
          message: "Lead criado (campo perfil não disponível)",
          warning: "Atualize o schema Prisma para incluir campo 'perfil'",
        },
        { status: 201 },
      );
    }
  } catch (error: unknown) {
    console.error("❌ Erro final ao criar lead:", error);

    return NextResponse.json(
      {
        error: "Erro ao criar lead",
        details: error instanceof Error ? error.message : String(error),
        solution: "Execute: npx prisma db push --force-reset",
      },
      { status: 500 },
    );
  }
}
