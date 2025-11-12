# Chatbot RFP - Blip Bootcamp

Chatbot para responder perguntas sobre RFPs utilizando Node.js, MongoDB e OpenAI.

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

**Pacotes incluídos:**

- `@slack/bolt` - SDK oficial do Slack
- `dotenv` - Gerenciamento de variáveis de ambiente
- `mongoose` - ODM para MongoDB
- `mongodb` - Driver nativo do MongoDB
- `axios` - Cliente HTTP
- `pdfjs-dist@3.11.174` - Extração de texto de PDFs

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```properties
SLACK_BOT_TOKEN=xoxb-seu-token-aqui
SLACK_APP_TOKEN=xapp-seu-token-aqui
SEND_MODE=DRY_RUN
MONGODB_URI=mongodb+srv://bot_user:senha@cluster0.nedicvh.mongodb.net/?appName=Cluster0
```

### 4. Rode o Projeto

```bash
node app.js
```

### 5. Teste o Bot

- Envie uma mensagem de texto no chat do bot
- Envie um arquivo PDF no chat do bot

**✅ Resultado esperado:**

- Mensagens de texto retornam confirmação
- PDFs são processados e o texto extraído aparece no terminal em formato JSON

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

# 3. Após finalizar
git add .
git commit -m "feat: descrição da feature"
git push origin feat/seu-nome/nome-da-task
```

---

## 📝 Observações

- `SEND_MODE=DRY_RUN`: Modo de teste (não envia mensagens reais no Slack)
- `SEND_MODE=PRODUCTION`: Modo produção (envia mensagens reais)
