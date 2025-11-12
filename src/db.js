const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Conectado ao MongoDB!");

    // Teste básico: listar databases
    const admin = mongoose.connection.db.admin();
    const { databases } = await admin.listDatabases();
    console.log(
      " Databases disponíveis:",
      databases.map((db) => db.name)
    );
  } catch (error) {
    console.error(" Erro ao conectar no MongoDB:", error.message);
    throw error;
  }
}

async function closeDB() {
  await mongoose.connection.close();
  console.log(" Conexão com MongoDB fechada");
}

module.exports = { connectDB, closeDB };
