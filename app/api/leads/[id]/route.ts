// app/api/leads/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const leadId = Number(id);

  if (Number.isNaN(leadId)) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead não encontrado" },
        { status: 404 }
      );
    }

    await prisma.lead.delete({
      where: { id: leadId },
    });

    return NextResponse.json(
      { message: "Lead excluído com sucesso" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Erro ao excluir lead:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        error: "Erro ao excluir lead",
        details: errorMessage,
        suggestion: "Tente novamente mais tarde ou contate o suporte",
      },
      { status: 500 }
    );
  }
}
