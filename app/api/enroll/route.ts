import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, whatsapp, email, pagamento } = body;

    const newLead = await prisma.lead.create({
      data: {
        nome,
        whatsapp,
        email,
        pagamento,
      },
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("ERRO_AO_SALVAR_LEAD:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar candidatura" }, 
      { status: 500 }
    );
  }
}