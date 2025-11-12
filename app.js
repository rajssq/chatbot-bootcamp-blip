process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Desabilitar verificação SSL (apenas para desenvolvimento)

require("dotenv").config();
const { App } = require("@slack/bolt");

// Inicializa o app com Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Detecta mensagens diretas
app.message(async ({ message, say }) => {
  console.log("📩 Mensagem recebida:", message);

  const resposta = `Olá! Recebi sua mensagem: "${message.text}"`;

  if (process.env.SEND_MODE === "DRY_RUN") {
    console.log("[DRY_RUN] Mensagem que seria enviada:", resposta);
  } else {
    await say(resposta);
  }
});

// Detecta quando arquivos são compartilhados
app.event("file_shared", async ({ event, client }) => {
  console.log("📎 Arquivo recebido:", event);

  const mensagem = "Recebi seu arquivo! Em breve vou processá-lo.";

  if (process.env.SEND_MODE === "DRY_RUN") {
    console.log("[DRY_RUN] Resposta ao arquivo:", mensagem);
  } else {
    await client.chat.postMessage({
      channel: event.channel_id,
      text: mensagem,
    });
  }
});

// Inicia o bot
(async () => {
  await app.start();
  console.log("⚡️ Bot está rodando!");
})();
