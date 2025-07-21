const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  
  const authHeader = req.header('Authorization');

    if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token format is not valid' });
  }
  
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (e) {
    
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;