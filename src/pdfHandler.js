const axios = require("axios");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");

/**
 * Extrai texto de um PDF enviado no Slack
 * @param {string} fileId - ID do arquivo no Slack
 * @param {Object} client - Cliente do Slack Bot
 * @returns {Object} { nomeArquivo, texto, paginas }
 */
async function extractTextFromPDF(fileId, client) {
  try {
    console.log("📥 Obtendo informações do arquivo:", fileId);

    // Obtém informações do arquivo via API do Slack
    const fileInfo = await client.files.info({ file: fileId });
    const file = fileInfo.file;

    console.log("📄 Arquivo:", file.name);

    // Download do PDF
    const response = await axios.get(file.url_private_download, {
      headers: {
        Authorization: `Bearer ${client.token}`,
      },
      responseType: "arraybuffer",
    });

    console.log("✅ Download completo:", response.data.byteLength, "bytes");

    const buffer = Buffer.from(response.data);

    // Valida se é um PDF
    const header = buffer.slice(0, 5).toString();
    if (!header.startsWith("%PDF")) {
      throw new Error("Arquivo não é um PDF válido");
    }

    console.log("📄 Extraindo texto do PDF...");

    // Carrega e processa o PDF
    const pdfData = await pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
    }).promise;

    // Extrai texto de todas as páginas
    let fullText = "";
    for (let pageNum = 1; pageNum <= pdfData.numPages; pageNum++) {
      const page = await pdfData.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    console.log(`✅ Texto extraído: ${fullText.trim().length} caracteres`);

    return {
      nomeArquivo: file.name,
      texto: fullText.trim(),
      paginas: pdfData.numPages,
    };
  } catch (error) {
    console.error("❌ Erro ao processar PDF:", error.message);
    throw error;
  }
}

module.exports = { extractTextFromPDF };
