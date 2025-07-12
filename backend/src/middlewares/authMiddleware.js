import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig.js';
const isAuthenticate = (req, res, next) => {
  try {
    // get token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized or Token is Required!"
      })
    }
    // decode token 
    const decoded = jwt.verify(token, envConfig.jwt_secret);

    req.userId = decoded.userId;
    // call next function
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or Expired Token" });
  }
}


export default isAuthenticate