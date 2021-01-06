import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IUserBase } from 'modules/users/model';
import users from '../users/schema';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: IUserBase,
      token: string;
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.header('Authorization').replace('Bearer ', '');
    const decode: { _id: string } = (verify(token, process.env.TOKEN_SECRET) as { _id: string });
    const user: IUserBase = await users.findOne({ _id: decode._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.'});
  }
};
