const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

const client = new MongoClient(uri);

let database = null;

async function connectDatabase() {
  try {
    await client.connect();

    database = client.db(process.env.DB_NAME);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
}

module.exports = {
  connectDatabase,
  getDatabase,
};