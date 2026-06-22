import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Backend looks in request for authorization field inside the header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches { id: user._id } to the request
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token validation failed or expired." });
  }
};

export default authMiddleware;
