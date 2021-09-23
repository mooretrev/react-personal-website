import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { UserInterface } from '../model/user';

export interface RequestJWT extends Request {
  jwtPayload?: JwtPayload;
}

export interface UserJwtPayload extends JwtPayload {
  data: UserInterface;
}

export default async (req: RequestJWT, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.cookies;
  try {
    const jwtPayload = jwt.verify(token, process.env.SIGNATURE as string) as UserJwtPayload;
    req.jwtPayload = jwtPayload;
    const userRecord = await User.findById(jwtPayload.data._id);
    if (userRecord.jwtToken === '') {
      return res.status(401).end(JSON.stringify({ authenicated: false }));
    }
  } catch (err) {
    return res.status(401).end(JSON.stringify({ authenicated: false }));
  }

  return next();
};
