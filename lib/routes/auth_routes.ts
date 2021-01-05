import { Application, Request, Response } from 'express';
import users from '../modules/users/schema';
import { compare } from 'bcrypt';

export class AuthRoutes {
    public route(app: Application) {
        app.post('/api/login', async (req: Request, res: Response) => {
            try {
              const user = await users.findOne({ email: req.body.email });
              if (!user) {
                throw new Error('Unable to login');
              }

              const isMatch: boolean = await compare(req.body.password, user.password);
              if (!isMatch) {
                throw new Error('Unable to login');
              }
              res.send(user);
            } catch (e) {
              res.status(400).send();
            }
        });
    }
}