import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("URL:", req.originalUrl);
  console.log("QUERY:", req.query);
  console.log("AUTH HEADER:", req.headers.authorization);

  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader) {
      token = authHeader.split(" ")[1];
    } else if (req.query.token) {
      token = req.query.token;
    }

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
export default authMiddleware;
