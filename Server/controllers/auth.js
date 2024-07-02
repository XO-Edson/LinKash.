import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "./supabaseConfig.js";

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const { data: existingUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the 'users' table
    const { data: newUser, insertError } = await supabase.from("users").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
      },
    ]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    // Return the newly created user
    res.status(201).json(newUser[0]);
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
