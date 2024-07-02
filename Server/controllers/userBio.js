import supabase from "./supabaseConfig.js";

const addUserBio = async (req, res) => {
  const { username, description } = req.body;
  const { userId } = req.userId;

  if (!username || !description) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const { data, error } = await supabase
      .from("user_bio")
      .insert([{ user_id: userId, username, description }])
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error inserting user bio" });
  }
};

const getBio = async (req, res) => {
  const { userId } = req.userId;

  try {
    const { data, error } = await supabase
      .from("user_bio")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching bio" });
  }
};

const checkUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) return res.json({ message: "Username required" });

  try {
    const { data, error } = await supabase
      .from("user_bio")
      .select("username")
      .eq("username", username);

    if (error) throw error;

    if (data.length > 0) {
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

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  try {
    const { error } = await supabase
      .from("users")
      .update({ first_name: firstName, last_name: lastName, email })
      .eq("id", userId);

    if (error) throw error;

    res.status(201).json({ message: "Bio updated!" });
  } catch (error) {
    console.error(error, "error updating bio");
    res.status(500).json({ message: "Error updating bio" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.userId;

  try {
    const { error, count } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) throw error;

    if (count === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error, "error deleting account");
    res.status(500).json({ message: "Error deleting account" });
  }
};

export { addUserBio, checkUsername, updateBio, deleteUser, getBio };
