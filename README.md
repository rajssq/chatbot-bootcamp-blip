# Chatbot RFP - Blip Bootcamp

Chatbot para responder perguntas sobre RFPs utilizando Node.js, MongoDB e OPEN AI.

---

## 🏗️ Arquitetura

1. Usuário envia documento RFP no Slack
2. Bot extrai perguntas do documento
3. Busca respostas similares no MongoDB (usando embeddings/vector search)
4. OPEN AI gera resposta baseada no contexto recuperado
5. Bot responde no Slack

---

## Setup do Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/rajssq/chatbot-bootcamp-blip.git
cd chatbot-bootcamp-blip
```

### 2. Instale as Dependências

```bash
npm install
```
### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
SLACK_BOT_TOKEN=xoxb-seu-token-aqui
SLACK_APP_TOKEN=xapp-seu-token-aqui
SEND_MODE=DRY_RUN
```

### 4. Rodar o projeto

```bash
node app.js
```

### 5. Testar o bot

- Mande uma mensagem no chat do bot
- Mande um pdf no chat do bot
  **Resultado esperado**: Mensagens de sucessos em ambas no terminal.
---
**Pacotes incluídos:**

- `@slack/bolt` - SDK oficial do Slack
- `dotenv` - Gerenciamento de variáveis de ambiente

**🔧 Tecnologias Futuras**

- Processamento de documentos: Libraries para PDF/DOCX (ex: pdf-parse, mammoth)
- MongoDB: Driver oficial ou Mongoose + Atlas Vector Search
- OpenAI: SDK oficial para embeddings e completions

---

## 🌿 Workflow Git

### Estrutura de Branches

```
main           # Branch principal (código estável)
  └── feat/nome/task
```

### Criando sua Branch de Trabalho

```bash
# 1. Sempre comece pela main atualizada
git checkout main
git pull origin main

# 2. Crie sua branch: tipo/seu-nome/descrição-da-task
git checkout -b feat/seu-nome/nome-da-task
```

---

## 📝 Observações

- `SEND_MODE=DRY_RUN`: Modo de teste (não envia mensagens reais no Slack)
- `SEND_MODE=PRODUCTION`: Modo produção (envia mensagens reais)
