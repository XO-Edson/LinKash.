import { json } from "express";
import pool from "../config/db.js";

const accountInfo = async (req, res) => {
  const { shortcode } = req.body;
  const userId = req.userId;

  if (!shortcode)
    return res.status(400).json({ message: "Shortcode required" });

  /* CHECKING FOR DUPLICATE SHORTCODE */
  try {
    const response = await pool.query(
      "SELECT shortcode FROM account_details WHERE shortcode = $1 ",
      [shortcode]
    );

    if (response.rows.length > 0)
      return res.status(400).json({ message: "Shortcode already exists" });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error getting account details" });
  }

  /* ADDING SHORTCODE */
  try {
    const response = await pool.query(
      "INSERT INTO account_details(shortcode,user_id) VALUES($1,$2) RETURNING *",
      [shortcode, userId.userId]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error getting account details" });
  }
};

const accountProfile = async (req, res) => {
  const { username } = req.params;

  const checkUsername = await pool.query(
    "SELECT * FROM user_bio WHERE username = $1",
    [username]
  );

  if (checkUsername.rows.length === 0) {
    res.status(400).json({ message: "Username missing" });
  }

  try {
    const userId = checkUsername.rows[0].user_id;

    const userData = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    res.status(200).json(userData.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error getting user page" });
  }
};

export { accountInfo, accountProfile };
