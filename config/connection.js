const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

async function connection() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("Connected to the database successfully!");
    return db;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
}

module.exports = connection;
