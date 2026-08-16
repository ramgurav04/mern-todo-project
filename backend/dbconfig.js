import "dotenv/config";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

export const CollectionName = "2";
const db_name = "mern";

export const client = new MongoClient(url, {
  serverSelectionTimeoutMS: 10_000,
});

let dbInstance = null;

export const connection = async () => {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(db_name);
  }
  return dbInstance;
};
