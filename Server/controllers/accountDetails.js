import supabase from "./supabaseConfig.js";

const accountInfo = async (req, res) => {
  const { shortcode } = req.body;
  const userId = req.userId;

  if (!shortcode)
    return res.status(400).json({ message: "Shortcode required" });

  /* CHECKING FOR DUPLICATE SHORTCODE */
  try {
    const { data: existingShortcode, error: fetchError } = await supabase
      .from("account_details")
      .select("shortcode")
      .eq("shortcode", shortcode)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // 'PGRST116' indicates no matching row found
      throw new Error(fetchError.message);
    }

    if (existingShortcode) {
      return res.status(400).json({ message: "Shortcode already exists" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error getting account details" });
  }

  /* ADDING SHORTCODE */
  try {
    const { data: newAccountDetail, error: insertError } = await supabase
      .from("account_details")
      .insert([{ shortcode, user_id: userId.userId }])
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    res.status(201).json(newAccountDetail);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error adding account details" });
  }
};

const accountProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const { data: userBio, error: fetchBioError } = await supabase
      .from("user_bio")
      .select("*")
      .eq("username", username)
      .single();

    if (fetchBioError) {
      return res.status(400).json({ message: "Username missing" });
    }

    const userId = userBio.user_id;

    const { data: userData, error: fetchUserError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (fetchUserError) {
      throw new Error(fetchUserError.message);
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error getting user page" });
  }
};

export { accountInfo, accountProfile };
