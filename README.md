# 🎓 INEFOR - Portal de Candidaturas & Gestão Admin

Este projeto é uma solução Full Stack desenvolvida para o **INEFOR**, composta por uma Landing Page de alta conversão para captura de leads (estudantes) e um Dashboard Administrativo robusto para gestão dessas candidaturas.



## 🏗️ Visão Geral do Sistema

O sistema foi desenhado para ser leve, seguro e autogerenciável:
1.  **Portal Público:** Onde potenciais estudantes conhecem os cursos e submetem os seus dados via formulário otimizado.
2.  **Base de Dados:** Persistência via SQLite gerenciada pelo Prisma ORM para máxima confiabilidade.
3.  **Área Restrita:** Dashboard protegido por autenticação criptografada para controlo total dos dados.

---

## 🚀 Stack Tecnológica

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
* **Base de Dados:** [SQLite](https://www.sqlite.org/) (Local, sem necessidade de servidores externos complexos)
* **ORM:** [Prisma 6+](https://www.prisma.io/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Segurança:** [Bcrypt](https://www.npmjs.com/package/bcrypt) para Hashing de senhas.

---

## 🛡️ Funcionalidades de Segurança

Implementamos uma arquitetura de segurança multicamada:

* **Middleware de Proteção:** Verificação de integridade de sessão a nível de servidor (Edge Runtime), impedindo acessos não autorizados a rotas `/admin`.
* **Cookies HTTP-Only:** Tokens de sessão que não podem ser acedidos via JavaScript no navegador, prevenindo ataques XSS.
* **Server Actions:** Manipulação de dados (como eliminar leads) protegida contra ataques CSRF e com revalidação instantânea de cache.
* **Criptografia de Dados:** Senhas administrativas nunca são guardadas em texto plano.



---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── app/
│   │   ├── (public)/       # Landing Page e formulário de inscrição
│   │   ├── admin/          # Dashboard e Login administrativo
│   │   ├── api/            # Endpoints para Auth e Integrações
│   │   └── layout.tsx      # Root layout com AuthProvider
│   ├── components/         # UI Components (Forms, Tabela, Sidebar)
│   ├── context/            # AuthContext para estado global
│   ├── lib/                # Configuração Prisma (Singleton) e Utils
│   └── middleware.ts       # Guarda de rotas administrativas
├── prisma/
│   ├── schema.prisma       # Definição dos modelos Lead e Admin
│   └── dev.db              # Base de dados SQLite
└── README.md


