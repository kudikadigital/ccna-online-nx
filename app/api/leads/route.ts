import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next'

// const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const lead = await prisma.lead.create({
        data: {
          nome: req.body.nome,
          email: req.body.email,
          whatsapp: req.body.whatsapp,
          experiencia: req.body.experiencia,
          objetivo: req.body.objetivo,
          profissao: req.body.profissao,
          empresa: req.body.empresa,
          cargo: req.body.cargo,
          status: 'lead',
        }
      })
      
      return res.status(200).json({ leadId: lead.id })
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar lead' })
    }
  }
}