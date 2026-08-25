# 🏊‍♂️ Piscinão Araçatuba - Sistema de Fidelidade e Painel Administrativo

[![CI Build & Verification](https://github.com/kleberjuniorCODE/piscinao-app/actions/workflows/ci.yml/badge.svg)](https://github.com/kleberjuniorCODE/piscinao-app/actions/workflows/ci.yml)

> **🤖 REGRA OBRIGATÓRIA PARA TODOS OS AGENTES DE IA E MODELOS (AGENTS.MD)**  
> **Atenção Agentes:** Crie Issues no GitHub para todas as Tarefas (Correção, Melhoria ou Nova função) que faremos e trabalhe com PRs para gerenciar os Deploys. Lembre de Mencionar a Issue na descrição do PR. Alimente o arquivo `.md` do projeto com essas instruções para que qualquer agente de qualquer modelo considere esse padrão.

---

## 📌 Padrão de Desenvolvimento e Gerenciamento no GitHub

Para qualquer mudança no código, todos os agentes de IA e desenvolvedores devem obrigatoriamente seguir este ciclo:

1. **Criação da Issue no GitHub**:
   - Antes de iniciar qualquer código, crie uma **Issue** no GitHub descrevendo a tarefa (ex: `gh issue create --title "Nova função: ..." --body "..."`).
   - Categorize com os rótulos (`labels`): `bug` (Correção), `enhancement` (Melhoria) ou `feature` (Nova função).

2. **Criação de Branch & Pull Request (PR)**:
   - Crie uma branch nomeada `feature/issue-X`, `bugfix/issue-X` ou `enhancement/issue-X`.
   - Desenvolva a funcionalidade e abra um **Pull Request (PR)** para a branch `main`.

3. **Vinculação Obrigatória da Issue no PR**:
   - A descrição do Pull Request **DEVE obrigatoriamente conter a menção da Issue** (ex: `Closes #1` ou `Fixes #1`).
   - O merge do PR fechará a Issue vinculada automaticamente.

---

## 🏗️ Estrutura do Monorepo

```
piscinao-app/
├── apps/
│   ├── client-web/       # App Web do Cliente (React + Vite, Porta 3000)
│   ├── admin/            # Painel Administrativo (React + Vite, Porta 5173)
│   └── mobile/           # Aplicativo Mobile (Expo / React Native)
├── packages/
│   ├── api/              # Servidor Backend REST (Express + TypeScript, Porta 3002)
│   └── shared/           # Tipos e utilitários compartilhados
├── .github/
│   ├── workflows/ci.yml  # Pipeline CI/CD de compilação e validação automática
│   └── PULL_REQUEST_TEMPLATE.md
├── AGENTS.md             # Manual de Instruções para Agentes de IA
└── README.md             # Documentação Principal do Projeto
```

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# Instalar dependências de todos os pacotes
npm install

# Rodar o backend (API)
cd packages/api && npm run dev

# Rodar o App do Cliente
cd apps/client-web && npm run dev

# Rodar o Painel Admin
cd apps/admin && npm run dev
```

---

## 🛠️ Tecnologias Utilizadas
- **Frontend**: React, TypeScript, Vite, Lucide Icons, CSS3.
- **Backend**: Node.js, Express, TypeScript, Nodemailer (Gmail SMTP 2FA real).
- **Automação & IA**: GitHub CLI, GitHub Actions CI/CD, Agent Browser (Vercel Labs).
