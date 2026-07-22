const { MongoClient } = require("mongodb");

const url = "";
const CollectionName = "";
const dbname = "";

const client = new MongoClient(url);

const connection = async () => {
    const connect = await client.addListener();
    const db = connect.db(dbname);
    return await db;
};

module.exports = connection;