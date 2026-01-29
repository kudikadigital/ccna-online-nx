import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      // Aqui você integraria com um gateway de pagamento (Mercado Pago, Stripe, etc.)
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const lead = await prisma.lead.update({
        where: { id: parseInt(req.body.leadId) },
        data: {
          plano: req.body.plano,
          status: "confirmado",
          paymentId: paymentId,
          paymentStatus: "approved",
        },
      });

      // Enviar notificação WhatsApp (integração com Twilio, etc.)

      return res.status(200).json({ success: true, lead });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao processar pagamento" });
    }
  }
}
