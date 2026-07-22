const { MongoClient } = require("mongodb");

const url = "mongodb+srv://ramgurav487_db_user:root@cluster0.tmoubjb.mongodb.net/?appName=Cluster0";
export const CollectionName = "Tasks";
const dbname = "mern-todo";

export const client = new MongoClient(url);

export const connection = async () => {
    const connect = await client.connect();
    const db = connect.db(dbname);
    return await db;
};
