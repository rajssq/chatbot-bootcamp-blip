process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Apenas para ambiente corporativo

require("dotenv").config();
const { App } = require("@slack/bolt");
const { connectDB } = require("./src/db");
const { extractTextFromPDF } = require("./src/pdfHandler");
const ragService = require("./src/ragService");

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

        // Indexa o documento no RAG
        await ragService.indexDocument(resultado.nomeArquivo, resultado.texto, {
          pageCount: resultado.paginas,
          slackFileId: arquivo.id,
          slackChannelId: message.channel,
        });

        const resposta = `Documento "${resultado.nomeArquivo}" processado e indexado com sucesso! (${resultado.paginas} páginas)\n\nAgora você pode fazer perguntas sobre o conteúdo do documento.`;

        if (process.env.SEND_MODE === "DRY_RUN") {
          console.log("[DRY_RUN]", resposta);
        } else {
          await say(resposta);
        }

        return;
      }
    }

    // Processa mensagens de texto normais usando RAG
    if (message.text) {
      console.log("🤔 Processando pergunta:", message.text);

      // Gera resposta usando RAG
      const result = await ragService.generateResponse(message.text);

      let resposta = result.answer;

      // Adiciona fontes se houver
      if (result.sources && result.sources.length > 0) {
        const sourcesText = result.sources
          .map(s => `- ${s.filename} (similaridade: ${s.similarity})`)
          .join("\n");
        resposta += `\n\n📚 *Fontes:*\n${sourcesText}`;
      }

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
