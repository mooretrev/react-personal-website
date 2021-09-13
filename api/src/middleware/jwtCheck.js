import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export default async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const jwtPayload = jwt.verify(token, process.env.SIGNATURE);
    req.jwtPayload = jwtPayload;
    const userRecord = await User.findById(jwtPayload.data._id);
    if (userRecord.jwtToken === '') {
      res.status(401).end(JSON.stringify({ authenicated: false }));
      return 0;
    }
  } catch (err) {
    res.status(401).end(JSON.stringify({ authenicated: false }));
    return 0;
  }

  return next();
};
