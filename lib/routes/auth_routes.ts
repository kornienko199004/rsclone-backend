import { Application, Request, Response } from 'express';
import auth from '../modules/middleware/auth';
import { AuthController } from '../controllers/authController';

export class AuthRoutes {
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        app.post('/api/login', (req: Request, res: Response) => {
          this.auth_controller.login(req, res);
        });

        app.post('/api/logout', auth, (req: Request, res: Response) => {
          this.auth_controller.logout(req, res);
        });
    }
}