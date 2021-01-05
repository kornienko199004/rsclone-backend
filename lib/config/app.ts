import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { UserRoutes } from "../routes/user_routes";
import { NoteRoutes } from "../routes/note_routes";
import { CommonRoutes } from "../routes/common_routes";

dotenv.config();
class App {

   public app: express.Application;

  //  public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();
   public mongoUrl = `${process.env.MONGO_URL}`;


   private user_routes: UserRoutes = new UserRoutes();

   private note_routes: NoteRoutes = new NoteRoutes();

   private common_routes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.user_routes.route(this.app);
      this.note_routes.route(this.app);
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
