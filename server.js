const path = require("path");
const { spawn } = require("child_process");
const { MongoClient } = require("mongodb");

const nextCli = path.join(__dirname, "node_modules", "next", "dist", "bin", "next");

async function checkMongoConnection() {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile(path.join(__dirname, ".env.local"));
  }

  if (!process.env.MONGODB_URI) {
    console.error("MongoDB: FAILED - MONGODB_URI is missing from .env.local");
    return;
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });

  try {
    await client.db("glowhaus").command({ ping: 1 });
    console.log("MongoDB: CONNECTED");
  } catch (error) {
    console.error(`MongoDB: FAILED - ${error.message}`);
  } finally {
    await client.close();
  }
}

async function startServer() {
  const nextProcess = spawn(process.execPath, [nextCli, "dev", "--webpack"], {
    env: process.env,
    stdio: "inherit",
  });

  checkMongoConnection();

  nextProcess.on("close", (exitCode) => {
    process.exit(exitCode ?? 0);
  });

  process.on("SIGINT", () => nextProcess.kill("SIGINT"));
  process.on("SIGTERM", () => nextProcess.kill("SIGTERM"));
}

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});