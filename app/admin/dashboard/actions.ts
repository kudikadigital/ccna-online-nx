"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({
      where: { id: Number(id) },
    });
    
    // Isso limpa o cache e atualiza a tabela instantaneamente
    revalidatePath("/admin/dash");
    return { success: true };
  } catch (error) {
    console.error("ERRO_AO_ELIMINAR_LEAD:", error);
    return { success: false, error: "Falha ao eliminar lead" };
  }
}