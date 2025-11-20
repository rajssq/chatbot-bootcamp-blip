const { OpenAIEmbeddings, ChatOpenAI } = require("@langchain/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const Document = require("./models/Document");

class RAGService {
  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small",
    });

    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4o-mini",
      temperature: 0.3,
    });

    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  // Processa e armazena documento com embeddings
  async indexDocument(filename, content, metadata = {}) {
    try {
      console.log(`Indexando documento: ${filename}`);

      // Divide o texto em chunks
      const chunks = await this.textSplitter.splitText(content);
      console.log(`Documento dividido em ${chunks.length} chunks`);

      // Gera embeddings para cada chunk
      const embeddingsArray = await this.embeddings.embedDocuments(chunks);
      console.log(`Embeddings gerados para ${embeddingsArray.length} chunks`);

      // Prepara os chunks com embeddings
      const chunksWithEmbeddings = chunks.map((text, index) => ({
        text,
        embedding: embeddingsArray[index],
        metadata: {
          chunkIndex: index,
          pageNumber: metadata.pageNumber || 1,
        },
      }));

      // Salva no MongoDB
      const doc = new Document({
        filename,
        content,
        chunks: chunksWithEmbeddings,
        metadata: {
          pageCount: metadata.pageCount || 1,
          slackFileId: metadata.slackFileId,
          slackChannelId: metadata.slackChannelId,
        },
      });

      await doc.save();
      console.log(`Documento ${filename} indexado com sucesso!`);

      return doc;
    } catch (error) {
      console.error("Erro ao indexar documento:", error);
      throw error;
    }
  }

  // Busca chunks relevantes usando similaridade de cosseno
  async retrieveRelevantChunks(query, topK = 5) {
    try {
      // Gera embedding da query
      const queryEmbedding = await this.embeddings.embedQuery(query);

      // Busca todos os documentos
      const documents = await Document.find({});

      if (documents.length === 0) {
        return [];
      }

      // Calcula similaridade para todos os chunks
      const allChunks = [];
      for (const doc of documents) {
        for (const chunk of doc.chunks) {
          const similarity = this.cosineSimilarity(queryEmbedding, chunk.embedding);
          allChunks.push({
            text: chunk.text,
            similarity,
            filename: doc.filename,
            metadata: chunk.metadata,
          });
        }
      }

      // Ordena por similaridade e retorna top K
      allChunks.sort((a, b) => b.similarity - a.similarity);
      return allChunks.slice(0, topK);
    } catch (error) {
      console.error("Erro ao buscar chunks:", error);
      throw error;
    }
  }

  // Calcula similaridade de cosseno entre dois vetores
  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Gera resposta usando RAG
  async generateResponse(question) {
    try {
      // Busca chunks relevantes
      const relevantChunks = await this.retrieveRelevantChunks(question);

      if (relevantChunks.length === 0) {
        return {
          answer: "Desculpe, não encontrei documentos relevantes para responder sua pergunta. Por favor, envie um PDF primeiro.",
          sources: [],
        };
      }

      // Monta o contexto
      const context = relevantChunks
        .map((chunk, i) => `[${i + 1}] (${chunk.filename}): ${chunk.text}`)
        .join("\n\n");

      // Prompt para o LLM
      const prompt = `Você é um assistente especializado em analisar documentos RFP (Request for Proposal).
Use APENAS as informações do contexto abaixo para responder a pergunta.
Se a informação não estiver no contexto, diga que não encontrou a informação nos documentos.

CONTEXTO:
${context}

PERGUNTA: ${question}

RESPOSTA:`;

      // Gera resposta
      const response = await this.llm.invoke(prompt);

      return {
        answer: response.content,
        sources: relevantChunks.map(c => ({
          filename: c.filename,
          similarity: c.similarity.toFixed(3),
        })),
      };
    } catch (error) {
      console.error("Erro ao gerar resposta:", error);
      throw error;
    }
  }

  // Lista documentos indexados
  async listDocuments() {
    const docs = await Document.find({}, "filename metadata.uploadedAt metadata.pageCount");
    return docs;
  }

  // Remove documento por ID
  async deleteDocument(documentId) {
    await Document.findByIdAndDelete(documentId);
  }
}

module.exports = new RAGService();
