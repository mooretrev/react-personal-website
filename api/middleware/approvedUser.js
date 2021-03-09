export default (req, res, next) => {
  if (!req.jwtPayload.data.approved) {
    res.status(401).end('User not approved');
  }
  next();
};
