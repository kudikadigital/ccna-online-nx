import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const paymentId = `pay_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 11)}`

    const lead = await prisma.lead.update({
      where: { id: body.leadId }, // ⚠️ se for UUID, NÃO use parseInt
      data: {
        plano: body.plano,
        status: "confirmado",
        paymentId,
        paymentStatus: "approved",
      },
    })

    return NextResponse.json(
      { success: true, lead },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar pagamento" },
      { status: 500 }
    )
  }
}
