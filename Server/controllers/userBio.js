import pool from "../config/db.js";

const addUserBio = async (req, res) => {
  const { username, description } = req.body;
  const { userId } = req.userId;

  if (!username || !description)
    res.status(400).json({ message: "All fields required" });

  // Check if the username already exists
  try {
    const usernameExists = await pool.query(
      "SELECT username FROM user_bio WHERE username = $1",
      [username]
    );

    if (usernameExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error checking username" });
  }

  // If username is unique, proceed with insertion
  try {
    const result = await pool.query(
      "INSERT INTO user_bio(user_id, username, description) VALUES ($1, $2, $3) RETURNING *",
      [userId, username, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error inserting user bio" });
  }
};

export default addUserBio;
