# 🏊 Piscinão Araçatuba — Site Oficial & Catálogo (piscinao.com)

Site institucional e catálogo completo de produtos do **Piscinão Araçatuba** para o domínio oficial `piscinao.com`, combinando a elegância e arquitetura da iGUI Piscinas com a identidade própria de mais de 20 anos de história da loja ("*Confiança que se constrói.*").

---

## 🚀 Como Iniciar em Desenvolvimento

```bash
# Na raiz do monorepo:
npm run dev --workspace=apps/site
# ou através do atalho:
npm run dev:site
```
Acesse em: `http://localhost:4000/`

---

## 🛠️ Como Compilar para Produção

```bash
npm run build --workspace=apps/site
```
Os arquivos otimizados para deploy serão gerados em `apps/site/dist/`.

---

## 📱 Estrutura de Rotas
- `/`: Home com Hero Carrossel, Demonstrações de Piscinas Prontas, Departamentos, Destaques, Simulador de Piscinas e Depoimentos.
- `/produtos` e `/piscinas`: Catálogo geral com busca em tempo real e filtros de categoria e preço.
- `/produto/:slug`: Página individual do produto com ficha técnica, cálculo em 12x, PIX 10% off e botão direto para WhatsApp (`(18) 99102-4742`).
- `/sobre`: História da fundação em 2004, foto da sede conceito e timeline.
- `/servicos`: 6 serviços com lista de benefícios e agendamento WhatsApp.
- `/contato`: Formulário controlado, canais de atendimento e Google Maps embed.

---

## 🎨 Paleta de Cores
- `#5B3422` (Chocolate Escuro Principal)
- `#7A4A2F` (Terracotta / Médio)
- `#F6F1E9` (Creme Suave - Leitura)
- `#7EC4E6` (Azul Céu - Badges & Ações)
- `#FFFFFF` (Branco Puro - Cards)
- `#3E2215` (Dark Background Rodapé)
- `#25D366` (Verde WhatsApp Comercial)

---

## 🔍 SEO & Google Indexing
- Schema.org (`LocalBusiness`, `Store`, `BreadcrumbList`) em JSON-LD.
- Meta tags OpenGraph e Twitter Cards dinâmicas (`SEOHead.tsx`).
- `robots.txt` e `sitemap.xml` configurados em `apps/site/public/`.
