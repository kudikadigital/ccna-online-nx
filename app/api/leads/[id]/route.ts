// app/api/leads/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    // Verificar se o lead existe
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead não encontrado" },
        { status: 404 }
      );
    }

    // Excluir o lead
    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Lead excluído com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao excluir lead:", error);
    
    return NextResponse.json(
      {
        error: "Erro ao excluir lead",
        details: error.message,
      },
      { status: 500 }
    );
  }
}