// app/api/upload-comprovativo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("comprovativo") as File;
    const leadId = formData.get("leadId") as string;
    const plano = formData.get("plano") as string;

    if (!file || !leadId) {
      return NextResponse.json(
        { error: "Arquivo e leadId são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o lead existe
    const lead = await prisma.lead.findUnique({
      where: { id: parseInt(leadId) }
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead não encontrado" },
        { status: 404 }
      );
    }

    // Validar tamanho do arquivo (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Arquivo muito grande (máximo 5MB)" },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Formato inválido. Use JPG, PNG ou PDF" },
        { status: 400 }
      );
    }

    // Criar nome único para o arquivo
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `comprovativo_${leadId}_${timestamp}.${fileExtension}`;

    // Em produção, você usaria um serviço de storage (S3, Cloudinary, etc.)
    // Aqui estamos salvando localmente apenas para demonstração
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Em produção, substitua por seu serviço de storage
    // const uploadResult = await uploadToCloudStorage(buffer, fileName);
    
    // Por enquanto, apenas atualizamos o lead com a informação do comprovativo
    await prisma.lead.update({
      where: { id: parseInt(leadId) },
      data: {
        plano: plano,
        status: "confirmado",
        paymentStatus: "comprovativo_enviado",
        // Adicione um campo para armazenar a URL do comprovativo se tiver
        // comprovativoUrl: uploadResult.url
      }
    });

    console.log(`✅ Comprovativo recebido para lead ${leadId}: ${fileName}`);

    return NextResponse.json(
      { 
        success: true, 
        message: "Comprovativo recebido com sucesso",
        fileName,
        leadId 
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("❌ Erro no upload do comprovativo:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    
    return NextResponse.json(
      { 
        error: "Erro ao processar comprovativo",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

// Função de exemplo para upload em produção
async function uploadToCloudStorage(buffer: Buffer, fileName: string) {
  // Implemente conforme seu serviço de storage preferido
  // Exemplo com Cloudinary:
  // const cloudinary = require('cloudinary').v2;
  // const result = await cloudinary.uploader.upload_stream(
  //   { folder: 'comprovativos', public_id: fileName },
  //   (error, result) => {
  //     if (error) throw error;
  //     return result;
  //   }
  // ).end(buffer);
  // return { url: result.secure_url };
  
  return { url: `https://storage.example.com/comprovativos/${fileName}` };
}