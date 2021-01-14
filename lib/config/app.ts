import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { UserRoutes } from "../routes/user_routes";
import { NoteRoutes } from "../routes/note_routes";
import { CommonRoutes } from "../routes/common_routes";
import { AuthRoutes } from "../routes/auth_routes";
import * as cors from "cors";

dotenv.config();
class App {

   public app: express.Application;

  //  public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();
   public mongoUrl = `${process.env.MONGO_URL}`;

   private user_routes: UserRoutes = new UserRoutes();

   private note_routes: NoteRoutes = new NoteRoutes();
   private auth_routes: AuthRoutes = new AuthRoutes();
   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.app.use(cors());
      this.app.use((req: express.Request, res: express.Response, next) => {
         console.log(req.method, req.path);
         next();
      });

      this.mongoSetup();
      this.user_routes.route(this.app);
      this.note_routes.route(this.app);
      this.auth_routes.route(this.app);
      this.common_routes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      // support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;
