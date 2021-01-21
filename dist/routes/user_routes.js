"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const auth_1 = require("../modules/middleware/auth");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.user_controller = new userController_1.UserController();
    }
    route(app) {
        app.post('/api/user', (req, res) => {
            this.user_controller.create_user(req, res);
        });
        app.get('/api/user/me', auth_1.default, (req, res) => {
            this.user_controller.get_user(req, res);
        });
        app.put('/api/user/me', auth_1.default, (req, res) => {
            this.user_controller.update_user(req, res);
        });
        app.put('/api/user/me/password', auth_1.default, (req, res) => {
            this.user_controller.update_user_password(req, res);
        });
        app.delete('/api/user/me', auth_1.default, (req, res) => {
            this.user_controller.delete_user(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;
