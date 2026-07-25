import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { MongoClient } from "mongodb";

const url = "mongodb+srv://ramgurav487_db_user:root@mern-todo.hbhcrns.mongodb.net/?appName=mern-todo";

export const CollectionName = "2";
const dbname = "mern";

export const client = new MongoClient(url, {
  serverSelectionTimeoutMS: 10_000,
});

let dbInstance = null;

export const connection = async () => {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(dbname);
  }
  return dbInstance;
};
