import { NextResponse } from "next/server";
// Importe aqui seu cliente do DB (Ex: Prisma ou Supabase)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, whatsapp, email, pagamento } = body;

    // Exemplo de lógica com um DB fictício
    await db.lead.create({ data: { nome, whatsapp, email, pagamento } });

    console.log("Novo Lead Recebido:", body);

    return NextResponse.json({ message: "Inscrição realizada!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar inscrição" }, { status: 500 });
  }
}