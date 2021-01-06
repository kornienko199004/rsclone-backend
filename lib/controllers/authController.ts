import { Request, Response } from 'express';
import { insufficientParameters, mongoError } from '../modules/common/service';
import users from '../modules/users/schema';
import { compare } from 'bcrypt';
import { IUserBase } from 'modules/users/model';

export class AuthController {
    public async login(req: Request, res: Response) {
        if (req.body.email && req.body.password) {
            try {
              const user: IUserBase = await users.findOne({ email: req.body.email });
              if (!user) {
                throw new Error('Unable to login');
              }

              const isMatch: boolean = await compare(req.body.password, user.password);
              if (!isMatch) {
                throw new Error('Unable to login');
              }
              const token: string = await user.generateAuthToken();
              res.send({ user: user.getPublicProfile(), token });
            } catch (err) {
              mongoError(err, res);
            }
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public async logout(req: Request, res: Response) {
        if (req) {
            try {
              console.log((req as any).user);
              console.log(req.user);
              req.user.tokens = req.user.tokens.filter((token) => {
                token.token !== req.token
              });
              await req.user.save();
              res.send();
            } catch (err) {
              mongoError(err, res);
            }
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }
}
