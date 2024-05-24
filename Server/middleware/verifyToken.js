import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.get("authorization");

  if (!token) res.status(400).json({ message: "Unauthorized access" });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.userId = verified;

    next();
  } catch (error) {
    console.error(error.message);
  }
};

export default verifyToken;
