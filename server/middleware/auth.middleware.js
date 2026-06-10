import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;

  if (!token) return res.status(401).json({ success: false, message: 'Token identification configuration missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ success: false, message: 'Context user not discovered.' });
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Security check loop clearance failed.' });
  }
};