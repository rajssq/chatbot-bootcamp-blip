# Chatbot RFP - Blip Bootcamp

Chatbot para responder perguntas sobre RFPs utilizando Node.js, React, MongoDB e Google Generative AI.

---

## 🏗️ Arquitetura e Tecnologias

> 💡 **Clique no diagrama abaixo para visualizar melhor e interagir**

[![Diagrama de Arquitetura do Sistema](https://mermaid.ink/img/pako:eNqVU-1um0AQfJXTRapa1XaNwYBRlcqx04Sqcdwk_lPojwucbRq4Q3eQOA1-mD5LX6zL8SGSRomKZHtvd3Z2mPU94ICHFDt4HfO7YEtEhr5e-AzBI_PrjSDpFn0WnGWUhZ6PmxD10QUlQebjHxW4fFau50JVrElAUcjRSuZ_fouIdyCqyZvxJOWMAlZWmQ5iuou49NR3nYVxPnsi6YgEN5WiOgJBC3iRwU-J3qPjXSqolI_ETZeuBx90cXx51RXEc1DhVT-d_AzeU_A4pkJ6nbiDOONsw7mkXhOg8_nZC5LnJCPXBPClZhZwFFLIhfyxTEU2P_Le1sHHa_HhcEnFJmcZkegN-CVTLiF-98KsqQtT3Okj5hPONzGFShWgE8qoIFl0SwH-L9fKRf3-Yb1l1u5OJdV2qqQKy2RxenW1BO-_XJ4vitLtur6seZTBNZGKVbpjbVXrJBSgMbeqtlaXA7_lVNwXjWMdwPxI1ZW5xROGJ_zFJU2QqC39VLQmVeDmpJALfktaaPGq8uJ5Iyqb1BKZpMWzVj5v-spt15zdw_7aq7iO4tg5oPp6tO5JkHBDnQNtYpnhqD7276Iw2zp6uuv2Nxenah_C8z_dzb-5btc0Y64ZLYFu29QOXiQAV-vJM90ytddacQ9vRBRiJxM57eGEioSUR_xQkvo429KE-tiBMCTixsc-20NPSth3zpOmTfB8s8XOmsQSTnkakozOIwKXJmmzAkyhYsbhwmHH0O2JYsHOA95hp6-PR4PxxDCtiWGZw6Ft9_A9dszxwNZ13bIsbTg2TM3c9_AvNVcb6JahjcyJpmkmQPZ_ARHMuAo?type=png)](https://mermaid.live/edit#pako:eNqVU-1um0AQfJXTRapa1XaNwYBRlcqx04Sqcdwk_lPojwucbRq4Q3eQOA1-mD5LX6zL8SGSRomKZHtvd3Z2mPU94ICHFDt4HfO7YEtEhr5e-AzBI_PrjSDpFn0WnGWUhZ6PmxD10QUlQebjHxW4fFau50JVrElAUcjRSuZ_fouIdyCqyZvxJOWMAlZWmQ5iuou49NR3nYVxPnsi6YgEN5WiOgJBC3iRwU-J3qPjXSqolI_ETZeuBx90cXx51RXEc1DhVT-d_AzeU_A4pkJ6nbiDOONsw7mkXhOg8_nZC5LnJCPXBPClZhZwFFLIhfyxTEU2P_Le1sHHa_HhcEnFJmcZkegN-CVTLiF-98KsqQtT3Okj5hPONzGFShWgE8qoIFl0SwH-L9fKRf3-Yb1l1u5OJdV2qqQKy2RxenW1BO-_XJ4vitLtur6seZTBNZGKVbpjbVXrJBSgMbeqtlaXA7_lVNwXjWMdwPxI1ZW5xROGJ_zFJU2QqC39VLQmVeDmpJALfktaaPGq8uJ5Iyqb1BKZpMWzVj5v-spt15zdw_7aq7iO4tg5oPp6tO5JkHBDnQNtYpnhqD7276Iw2zp6uuv2Nxenah_C8z_dzb-5btc0Y64ZLYFu29QOXiQAV-vJM90ytddacQ9vRBRiJxM57eGEioSUR_xQkvo429KE-tiBMCTixsc-20NPSth3zpOmTfB8s8XOmsQSTnkakozOIwKXJmmzAkyhYsbhwmHH0O2JYsHOA95hp6-PR4PxxDCtiWGZw6Ft9_A9dszxwNZ13bIsbTg2TM3c9_AvNVcb6JahjcyJpmkmQPZ_ARHMuAo)

### Por que essas tecnologias?

**Backend - Node.js + Express**

- **Node.js**: Runtime JavaScript que permite usar a mesma linguagem no front e back
- **Express**: Framework minimalista e flexível para criar APIs REST rapidamente
- **Mongoose**: ODM (Object Document Mapper) que facilita a interação com MongoDB

**Frontend - React**

- **React**: Biblioteca JavaScript para criar interfaces interativas e componentes reutilizáveis
- **Axios**: Cliente HTTP que simplifica requisições à API (melhor que fetch nativo)

**Banco de Dados - MongoDB**

- **MongoDB**: Banco NoSQL orientado a documentos, ideal para armazenar perguntas e respostas em formato flexível (JSON)
- Facilita ajustes na estrutura dos dados sem migrations complexas

**IA - Google Generative AI**

- API de IA generativa para criar respostas automáticas e contextuais
- Integração simples via SDK oficial do Google

**Ferramentas de Desenvolvimento**

- **nodemon**: Reinicia automaticamente o servidor quando há mudanças no código
- **concurrently**: Permite rodar backend e frontend simultaneamente com um único comando
- **cors**: Habilita comunicação entre frontend (porta 3000) e backend (porta 5000)
- **dotenv**: Gerencia variáveis de ambiente (chaves de API, conexões) de forma segura

## Começando a Desenvolver

### 1. Clone o Repositório

```bash
git clone https://github.com/rajssq/chatbot-bootcamp-blip.git
cd chatbot-rfp
```

### 2. Crie sua Branch de Trabalho

⚠️ **IMPORTANTE**: Sempre crie uma branch antes de instalar as dependências!

```bash
# Crie sua branch a partir da main
git checkout -b feat/seu-nome/sua-task
```

### 3. Instale as Dependências

Agora sim, instale todas as dependências:

```bash
# Instala dependências da raiz, server e client
npm run install-all
```

## ⚙️ Configuração

> ⚠️ **As configurações de banco de dados e APIs serão definidas durante o desenvolvimento.**
>
> Por enquanto, o arquivo `.env.example` contém apenas a PORT=5000.

### O que será necessário configurar:

- **MongoDB**: Banco de dados (definir se local ou Atlas)
- **Google AI API**: Chave de acesso para IA generativa
- **Porta do servidor**: Já configurada como 5000

## Rodando o Projeto

```bash
# Rodar backend e frontend simultaneamente
npm run dev

# Ou rodar separadamente:
npm run server  # Backend na porta 5000
npm run client  # Frontend na porta 3000
```

## 📁 Estrutura do Projeto

```
chatbot-rfp/
├── server/           # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── models/         # Schemas do MongoDB
│   │   ├── routes/         # Endpoints da API
│   │   ├── config/         # Configurações (DB, AI)
│   │   └── server.js       # Arquivo principal
│   └── package.json
├── client/           # Frontend React
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/            # Documentação detalhada
├── package.json     # Configuração raiz
└── README.md
```

# 🌿 Workflow Git - Boas Práticas

### Estrutura de Branches

```
main           # Branch principal (código estável/template base)
  └── feat/nome/task
```

### Criando sua Branch de Trabalho

```bash
# 1. Sempre comece pela main atualizada
git checkout main
git pull origin main

# 2. Crie sua branch com o padrão: tipo/seu-nome/descrição-da-task
git checkout -b feat/seu-nome/nome-da-task
```

## 🐛 Problemas Conhecidos

### Vulnerabilidades npm

Durante a instalação, podem aparecer avisos de vulnerabilidades. Isso é normal:

- São dependências de desenvolvimento do React
- Não afetam o funcionamento do projeto
- Não comprometem segurança em ambiente local
