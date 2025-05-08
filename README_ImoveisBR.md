# 🏠 Imóveis BR - Plataforma de Análise e Assinatura de Imóveis

Sistema completo para visualização, análise e assinatura online de dados de imóveis da Caixa Econômica Federal. Oferece painéis interativos, autenticação de usuários, cobrança automatizada e envio de recibos por e-mail.

---

## 🔧 Tecnologias Utilizadas

| Camada         | Ferramenta                            |
|----------------|----------------------------------------|
| Frontend       | React + Vite + TailwindCSS             |
| Backend        | FastAPI (Python)                       |
| Banco de Dados | PostgreSQL                             |
| Autenticação   | Supabase Auth ou Django Allauth        |
| Pagamento      | Stripe (mensal ou anual)               |
| E-mail         | Resend / SendGrid (envio de recibos)   |
| Deploy         | Render / Railway / Supabase            |

---

## 📦 Funcionalidades

- Importação automatizada de imóveis via script Python
- Categorização automática de tipo de imóvel (apartamento, casa, terreno etc.)
- Dashboard com:
  - Gráfico de quantidade de imóveis por categoria
  - Lista dos maiores descontos (em %)
  - Filtros por estado (UF), cidade, bairro e modalidade de venda
- Autenticação de usuários com e-mail e senha
- Página de cadastro com liberação de acesso após pagamento
- Assinatura online (Stripe) com recibo automático enviado por e-mail
- Site institucional com informações sobre o projeto e planos

---

## 📁 Estrutura de Diretórios

```
imoveis-dashboard/
│
├── backend/                    # API em FastAPI
│   ├── api/                    # Rotas REST
│   ├── database/               # Modelos e conexão PostgreSQL
│   ├── jobs/                   # Script automático de importação do CSV
│   ├── services/               # Extração de categoria e lógica de negócios
│   └── main.py                 # App principal
│
├── frontend/                   # Aplicação React
│   ├── pages/
│   ├── components/
│   └── services/               # API e Stripe integration
│
├── .env                        # Variáveis de ambiente
└── README.md                   # Este arquivo
```

---

## ⏳ Automação de Dados

A atualização dos dados será feita automaticamente por um script que:

1. Baixa o CSV diário da Caixa:
   [`https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp`](https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp)
2. Salva localmente no diretório configurado
3. Lê e processa os dados, extraindo:
   - Categoria (antes da primeira vírgula da coluna **Descrição**)
   - Preço, Valor de Avaliação e % de Desconto
4. Atualiza o banco de dados

---

## 🔐 Cadastro e Autenticação

- Página de cadastro com campos de e-mail, senha e dados do usuário
- Confirmação por e-mail
- Login seguro com autenticação persistente
- Área de usuário com acesso ao painel e filtros salvos

---

## 💳 Pagamento e Assinatura

Utilização do Stripe para pagamentos:

- Planos: **Mensal** e **Anual**
- Checkout integrado ao frontend
- Webhooks que liberam acesso automaticamente após o pagamento
- Envio de recibos e confirmação via e-mail

---

## 🚀 Deploy e Escalabilidade

O projeto será hospedado em plataformas modernas e escaláveis:

- **Render**, **Railway** ou **Supabase**
- Suporte a HTTPS, PostgreSQL, workers, e escalonamento automático
- Ideal para 100 usuários iniciais e expansão até 10.000 sem grandes alterações

---

## 📬 Contato

Projeto mantido por **Tiago Siqueira**  
📧 E-mail: [tpsiqueira@gmail.com](mailto:tpsiqueira@gmail.com)