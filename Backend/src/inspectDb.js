// Utilitario: mostra o estado do banco (collections e quantidade de documentos).
// Uso: npm run db:inspect   (rode com o servidor PARADO)
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./database/connection.js";
import { stopMemoryServer } from "./database/memoryServer.js";

dotenv.config();

await connectDB();

const db = mongoose.connection.db;
console.log(`\nBanco: ${mongoose.connection.name}`);

const collections = await db.listCollections().toArray();

if (collections.length === 0) {
  console.log("(banco vazio - nenhuma collection criada ainda)");
} else {
  for (const c of collections) {
    const total = await db.collection(c.name).countDocuments();
    console.log(`- ${c.name}: ${total} documento(s)`);
  }
}

console.log("");

await mongoose.connection.close();
await stopMemoryServer();
process.exit(0);
