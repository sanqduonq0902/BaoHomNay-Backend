const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer token
  if (!token) return res.status(401).json({ message: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, username }
    console.log('Decoded JWT:', decoded); // ✅ kiểm tra
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token is invalid or expired' });
  }
}

module.exports = verifyToken;
