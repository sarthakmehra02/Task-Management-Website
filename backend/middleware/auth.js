const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Get the token from the request header
  const authHeader = req.header('Authorization');

  // Check if there is no token
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Check if the token is in the correct 'Bearer <token>' format
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token format is not valid' });
  }
  
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user's ID from the token's payload to the request object
    // This makes the user's ID available in all subsequent protected routes
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  } catch (e) {
    // If the token is not valid (e.g., expired, incorrect secret)
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;