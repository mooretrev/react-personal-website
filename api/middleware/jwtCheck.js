import jwt from 'jsonwebtoken';

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return 0;
};

export default (req, res, next) => {
  const token = getTokenFromHeader(req);
  try {
    const jwtPayload = jwt.verify(token, process.env.SIGNATURE);
    req.jwtPayload = jwtPayload;
  } catch (err) {
    res.status(401).end('Invalid jwt');
  }

  return next();
};
