import { NextFunction, Response } from 'express';
import { RequestJWT } from './jwtCheck';

export default function approvedUser(req: RequestJWT, res: Response, next: NextFunction): void {
  if (!req.jwtPayload || !req.jwtPayload.data.approved) {
    res.status(401).end('User not approved');
  }
  next();
}
