const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  chunks: [{
    text: String,
    embedding: [Number],
    metadata: {
      chunkIndex: Number,
      pageNumber: Number,
    }
  }],
  metadata: {
    pageCount: Number,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    slackFileId: String,
    slackChannelId: String,
  }
});

// Index para busca vetorial (MongoDB Atlas Vector Search)
documentSchema.index({ "chunks.embedding": "2dsphere" });

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
