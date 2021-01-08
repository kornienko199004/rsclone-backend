"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const user_routes_1 = require("../routes/user_routes");
const note_routes_1 = require("../routes/note_routes");
const common_routes_1 = require("../routes/common_routes");
const auth_routes_1 = require("../routes/auth_routes");
dotenv.config();
class App {
    constructor() {
        //  public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();
        this.mongoUrl = `${process.env.MONGO_URL}`;
        this.user_routes = new user_routes_1.UserRoutes();
        this.note_routes = new note_routes_1.NoteRoutes();
        this.auth_routes = new auth_routes_1.AuthRoutes();
        this.common_routes = new common_routes_1.CommonRoutes();
        this.app = express();
        this.config();
        this.app.use((req, res, next) => {
            console.log(req.method, req.path);
            next();
        });
        this.mongoSetup();
        this.user_routes.route(this.app);
        this.note_routes.route(this.app);
        this.auth_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}
exports.default = new App().app;
