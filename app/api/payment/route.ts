import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("💰 Payment request:", body);

    // Validar
    if (!body.leadId || !body.plano) {
      return NextResponse.json(
        { error: "Lead ID e plano são obrigatórios" },
        { status: 400 },
      );
    }

    // Verificar se o lead existe
    const existingLead = await prisma.lead.findUnique({
      where: { id: parseInt(body.leadId) },
    });

    if (!existingLead) {
      return NextResponse.json(
        { error: "Lead não encontrado" },
        { status: 404 },
      );
    }

    // Gerar ID de pagamento simulado
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Atualizar lead com plano e status
    const updatedLead = await prisma.lead.update({
      where: { id: parseInt(body.leadId) },
      data: {
        plano: body.plano, // "vista" ou "parcelado"
        status: "confirmado",
        paymentId: paymentId,
        paymentStatus: "approved",
      },
    });

    console.log("✅ Lead atualizado:", updatedLead.id);

    // TODO: Integrar com gateway de pagamento real
    // TODO: Enviar notificação por WhatsApp/Email

    return NextResponse.json(
      {
        success: true,
        leadId: updatedLead.id,
        plano: updatedLead.plano,
        message: "Pagamento processado com sucesso!",
        nextSteps: "Em breve entraremos em contato via WhatsApp.",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("❌ Erro no pagamento:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        error: "Erro ao processar pagamento",
        details: errorMessage,
        suggestion: "Tente novamente mais tarde ou contate o suporte",
      },
      { status: 500 },
    );
  }
}
