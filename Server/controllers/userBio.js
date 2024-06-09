import pool from "../config/db.js";

const addUserBio = async (req, res) => {
  const { username, description } = req.body;
  const { userId } = req.userId;

  if (!username || !description)
    res.status(400).json({ message: "All fields required" });

  /* ADDING NEW USERNAME */
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

const checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) return res.json({ message: "username required" });

  /* CHECKING FOR DUPLICATE USERNAME */
  try {
    const usernameExists = await pool.query(
      "SELECT username FROM user_bio WHERE username = $1",
      [username]
    );

    if (usernameExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    return res.status(200).json({ message: "Username available" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error checking username" });
  }
};

const updateBio = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { userId } = req.userId;

  console.log(firstName, lastName, email);
  if (!firstName || !lastName || !email)
    return res.status(400).json({ message: "Name and email required" });

  try {
    const updatePersonalInfo = await pool.query(
      `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4`,
      [firstName, lastName, email, userId]
    );

    res.status(201).json({ message: "Bio updated!" });
  } catch (error) {
    console.error(error, "error updating bio");
  }
};

export { addUserBio, checkUsername, updateBio };
