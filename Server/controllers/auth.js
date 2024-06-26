import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import supabase from "./supabaseConfig.js";

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingEmail = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  try {
    if (existingEmail.rows.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    );
    console.log(result.rows);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Query the 'users' table in Supabase
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // Assuming email is unique and you expect one result

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = data;

    // Compare hashed password with user input
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN, {
      expiresIn: "3h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error logging in" });
  }
};

export { register, login };
