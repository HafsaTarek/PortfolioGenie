// Middleware that restricts access to admin-only routes.

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required.",
    });
  }
  return next();
};

export default adminMiddleware;
