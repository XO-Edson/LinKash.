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
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => console.log("Database connected..."));

pool.on("error", (error) =>
  console.error("Database connection error", error.message)
);

/* const checkDatabase = async () => {
  try {
    console.log("Attempting to connect to the database...");
    const res = await pool.query("SELECT NOW()");
    console.log("Database response:", res.rows[0]);

    console.log("Creating test table...");
    await pool.query(
      "CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name VARCHAR(50))"
    );

    console.log("Inserting test data...");
    await pool.query("INSERT INTO test_table (name) VALUES ('test')");

    console.log("Selecting test data...");
    const testData = await pool.query("SELECT * FROM test_table");
    console.log("Test data:", testData.rows);

    console.log("Dropping test table...");
    await pool.query("DROP TABLE test_table");
  } catch (error) {
    console.error("Database operation error:", error.message);
  } finally {
    await pool.end();
  }
};

checkDatabase(); */

export default pool;
