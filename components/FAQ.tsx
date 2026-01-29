"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeHelp } from "lucide-react";

const faqs = [
  {
    question: "É 100% ONLINE?",
    answer:
      "Sim. A formação é totalmente online, com aulas ao vivo realizadas via Zoom. Todas as aulas ficam gravadas e disponíveis na plataforma para que você possa rever sempre que precisar.",
  },
  {
    question: "PRECISO TER EXPERIÊNCIA PRÉVIA?",
    answer:
      "Não. A formação foi desenhada tanto para iniciantes que estão começando do zero quanto para técnicos que desejam fortalecer a base teórica e prática em redes.",
  },
  {
    question: "TEM CERTIFICAÇÃO?",
    answer:
      "Sim. Ao concluir cada módulo, você receberá um certificado oficial de conclusão fornecido pela CISCO Networking Academy (NetAcad).",
  },
  {
    question: "VOU TER PRÁTICA MESMO SENDO ONLINE?",
    answer:
      "Sim. A formação inclui laboratórios práticos, simulações e exercícios guiados, utilizando ferramentas oficiais para que você desenvolva experiência real em redes.",
  },
  {
    question: "HÁ MATERIAL DIDÁTICO INCLUSO?",
    answer:
      "Sim. Todo o material didático está incluso no valor do curso, incluindo apostilas digitais, conteúdos oficiais da Cisco e acesso às ferramentas utilizadas durante as aulas.",
  },
  {
    question: "QUAL É O PERFIL DOS OUTROS ALUNOS?",
    answer:
      "Nossos alunos são profissionais de TI, estudantes de engenharia, técnicos de redes e gestores que buscam especialização e crescimento na área de redes e infraestrutura.",
  },
  {
    question: "POSSO PARCELAR O PAGAMENTO?",
    answer:
      "Sim. Oferecemos a opção de pagamento em até 2 parcelas, de acordo com o lote escolhido no momento da inscrição.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-8">
            <BadgeHelp className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-bold uppercase text-sm tracking-wider">
              Dúvidas Comuns
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
            FAQ<span className="text-blue-600">.</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Tudo o que você precisa saber sobre a formação CCNA no INEFOR.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-3xl border border-slate-200 px-6 shadow-sm overflow-hidden transition-all data-[state=open]:border-blue-200 data-[state=open]:ring-4 data-[state=open]:ring-blue-50"
            >
              <AccordionTrigger className="hover:no-underline py-6 text-left">
                <span className="font-black text-slate-800 uppercase tracking-tight text-sm md:text-base leading-tight">
                  <span className="text-blue-600 mr-3">{index + 1}.</span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 font-medium leading-relaxed pb-6 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
