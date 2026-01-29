import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const lead = await prisma.lead.create({
      data: {
        nome: body.nome,
        email: body.email,
        whatsapp: body.whatsapp,
        plano: body.plano, // ✅ OBRIGATÓRIO
        experiencia: body.experiencia,
        objetivo: body.objetivo,
        profissao: body.profissao,
        empresa: body.empresa,
        cargo: body.cargo,
        status: "lead",
      },
    })

    return NextResponse.json(
      { leadId: lead.id },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar lead" },
      { status: 500 }
    )
  }
}
