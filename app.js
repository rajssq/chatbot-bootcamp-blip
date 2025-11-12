process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Apenas para ambiente corporativo

require("dotenv").config();
const { App } = require("@slack/bolt");
const { connectDB } = require("./src/db");
const { extractTextFromPDF } = require("./src/pdfHandler");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Handler para mensagens recebidas
app.message(async ({ message, say, client }) => {
  console.log("📩 Mensagem recebida:", message);

  try {
    // Verifica se há arquivos anexados
    if (message.files && message.files.length > 0) {
      const arquivo = message.files[0];

      // Processa apenas PDFs
      if (arquivo.mimetype === "application/pdf") {
        console.log("📎 PDF detectado:", arquivo.name);

        // Extrai texto do PDF
        const resultado = await extractTextFromPDF(arquivo.id, client);
        console.log("📄 Conteúdo extraído:", resultado);

        if (process.env.SEND_MODE === "DRY_RUN") {
          console.log("[DRY_RUN] PDF processado e texto extraído");
        }

        return;
      }
    }

    // Processa mensagens de texto normais
    if (message.text) {
      const resposta = `Olá! Recebi sua mensagem: "${message.text}"`;

      if (process.env.SEND_MODE === "DRY_RUN") {
        console.log("[DRY_RUN]", resposta);
      } else {
        await say(resposta);
      }
    }
  } catch (error) {
    console.error(" Erro ao processar mensagem:", error);

    const mensagemErro =
      " Desculpe, ocorreu um erro ao processar sua solicitação.";

    if (process.env.SEND_MODE === "DRY_RUN") {
      console.log("[DRY_RUN]", mensagemErro);
    } else {
      await say(mensagemErro);
    }
  }
});

// Inicialização do bot
(async () => {
  try {
    console.log("🔧 Conectando no MongoDB...");
    await connectDB();

    console.log("🔧 Iniciando bot...");
    await app.start();

    console.log("⚡️ Bot está rodando!");
    console.log("📱 Pronto para receber PDFs e extrair texto!");
  } catch (error) {
    console.error(" Erro ao iniciar:", error);
    process.exit(1);
  }
})();
