import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.admin.findUnique({
    where: { username }
  });

  if (!user) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  // Compara a senha digitada com o hash do banco
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  // Aqui você retornaria o Token/Sessão (JWT ou Cookie)
  return NextResponse.json({ success: true });
}