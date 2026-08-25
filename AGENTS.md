# 📋 Regras de Trabalho e Automação no GitHub (AGENTS & DEVELOPERS)

> **Instrução Obrigatória para Agentes de IA e Desenvolvedores**  
> Este repositório segue um fluxo estrito de gerenciamento de tarefas e deploys via GitHub. Qualquer alteração ou nova funcionalidade DEVE seguir este padrão sem exceções.

---

## 🚀 Fluxo de Trabalho Obrigatório

### 1. 📌 Criação de Issues no GitHub
- Toda tarefa a ser realizada — seja de **Correção (Bugfix)**, **Melhoria (Enhancement)** ou **Nova Função (Feature)** — DEVE ter uma **Issue criada no GitHub** antes do início do desenvolvimento.
- A Issue deve ter um título claro, descrição detalhada do objetivo e a etiqueta (`label`) correspondente:
  - `bug` (para correções)
  - `enhancement` (para melhorias)
  - `feature` (para novas funções)

### 2. 🔀 Desenvolvimento via Branches & Pull Requests (PRs)
- Nenhuma alteração deve ser feita diretamente na branch principal (`main`).
- Cada tarefa deve ser desenvolvida em uma branch dedicada nomeada conforme a Issue:
  - Exemplo: `feature/issue-1-login-2fa` ou `bugfix/issue-2-alinhamento-tabela`
- O deploy e fusão de código deve ser gerenciado exclusivamente através de **Pull Requests (PRs)**.

### 3. 🔗 Vinculação Obrigatória da Issue no PR
- A descrição de TODO Pull Request DEVE obrigatoriamente **mencionar e vincular a Issue correspondente**.
- Utilize as palavras-chave do GitHub na descrição do PR:
  - `Closes #1` (ou `Fixes #1`, `Resolves #1`)
- Exemplo de descrição de PR:
  ```markdown
  ## 📝 Descrição
  Implementação do sistema de autenticação 2FA no login do cliente.

  ## 🔗 Issue Relacionada
  Closes #1
  ```

---

## ⚙️ Automações no Repositório
- **GitHub Actions (CI/CD)**: Todo PR criado ou atualizado dispara verificações automáticas de compilação (`npm run build`) e testes antes do merge.
- **Fechamento Automático de Issues**: Quando o PR for aceito e mesclado na branch `main`, o GitHub fechará a Issue vinculada automaticamente.
