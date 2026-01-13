"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "É 100% ONLINE?",
    answer: "Sim, o formato é totalmente online com aulas ao vivo via Zoom. Todas as sessões são gravadas e disponibilizadas na nossa plataforma para consulta posterior, permitindo que você estude no seu próprio ritmo.",
  },
  {
    question: "PRECISO TER EXPERIÊNCIA PRÉVIA EM REDES?",
    answer: "Não. A formação foi desenhada para atender tanto iniciantes do zero quanto técnicos que já atuam na área mas desejam consolidar a base teórica e prática necessária para o mercado global.",
  },
  {
    question: "A CERTIFICAÇÃO É OFICIAL?",
    answer: "Sim. Ao concluir cada módulo com sucesso, você recebe o certificado oficial da CISCO NETACAD, reconhecido internacionalmente por empresas de tecnologia.",
  },
  {
    question: "COMO FUNCIONAM AS AULAS PRÁTICAS?",
    answer: "Utilizamos as ferramentas oficiais da Cisco, como o Packet Tracer e GNS3. Você realizará laboratórios reais, configurando roteadores e switches em cenários que simulam o dia a dia de um engenheiro de redes.",
  },
  {
    question: "QUAIS SÃO AS OPÇÕES DE PAGAMENTO?",
    answer: "Oferecemos condições facilitadas: pagamento à vista com desconto (AOA 80.000) ou parcelado em até 2 prestações de AOA 42.000.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4 block">
            Dúvidas Comuns
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">
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