import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function getMongoClient() {
  if (!uri) {
    global._mongoConnectionError = new Error("MONGODB_URI is missing from the deployment environment.");
    return null;
  }

  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
  }

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = global._mongoClient.connect().catch((error) => {
      global._mongoClientPromise = null;
      global._mongoConnectionError = error;
      return null;
    });
  }

  return global._mongoClientPromise;
}

export function getMongoConnectionMessage() {
  const message = global._mongoConnectionError?.message || "";
  if (/bad auth|authentication failed/i.test(message)) {
    return "MongoDB username or password is incorrect. Update Database Access credentials in .env.local.";
  }
  if (/MONGODB_URI is missing/i.test(message)) {
    return "MONGODB_URI is missing in Vercel Environment Variables.";
  }
  if (/ssl|tls|server selection|timed out/i.test(message)) {
    return "MongoDB Atlas network access is blocking this app. Add your current IP in Atlas Network Access.";
  }
  return "MongoDB is unavailable. Check your Atlas settings and try again.";
}
