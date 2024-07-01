import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: "postgres.wulnpdquhyxlimjelymz",
  host: "aws-0-eu-central-1.pooler.supabase.com",
  database: "postgres",
  password: process.env.PASSWORD,
  port: 6543,
});

pool.on("connect", () => console.log("Database connected..."));

pool.on("error", (error) =>
  console.error("Database connection error", error.message)
);

export default pool;
