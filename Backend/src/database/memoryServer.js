import { MongoMemoryServer } from "mongodb-memory-server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pasta onde os dados ficam salvos (na raiz do Backend).
// Por ser persistente, suas tarefas/usuarios continuam entre as aulas.
const dbPath = path.resolve(__dirname, "../../.mongo-data");

let mongoServer = null;

export async function startMemoryServer() {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: "todo-api",
      dbPath,
      storageEngine: "wiredTiger",
    },
  });

  return mongoServer.getUri("todo-api");
}

export async function stopMemoryServer() {
  if (mongoServer) {
    // doCleanup: false -> NAO apaga a pasta .mongo-data (mantem os dados)
    await mongoServer.stop({ doCleanup: false });
    mongoServer = null;
  }
}
