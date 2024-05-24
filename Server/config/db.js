import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_auth",
  password: process.env.PASSWORD,
  port: 5432,
});

pool.on("connect", () => console.log("Database connected..."));

pool.on("error", (error) =>
  console.error("Database connection error", error.message)
);

export default pool;
