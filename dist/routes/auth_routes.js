"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_1 = require("../modules/middleware/auth");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.auth_controller = new authController_1.AuthController();
    }
    route(app) {
        app.post('/api/login', (req, res) => {
            this.auth_controller.login(req, res);
        });
        app.post('/api/logout', auth_1.default, (req, res) => {
            this.auth_controller.logout(req, res);
        });
    }
}
exports.AuthRoutes = AuthRoutes;
