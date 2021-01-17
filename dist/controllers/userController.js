"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/users/service");
class UserController {
    constructor() {
        this.user_service = new service_2.default();
    }
    create_user(req, res) {
        if (req.body.email && req.body.password && req.body.name) {
            const user_params = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New user created'
                    }]
            };
            this.user_service.createUser(user_params, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('user created successfully', user_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_user(req, res) {
        res.send(req.user);
    }
    update_user(req, res) {
        if (req.body.email ||
            req.body.password || req.body.name) {
            req.user.modification_notes.push({
                modified_on: new Date(Date.now()),
                modified_by: null,
                modification_note: 'User updated'
            });
            const user_params = {
                _id: req.user._id,
                email: req.body.email ? req.body.email : req.user.email,
                name: req.body.name ? req.body.name : req.user.name,
                password: req.body.password ? req.body.password : req.user.password,
                is_deleted: req.body.is_deleted ? req.body.is_deleted : req.user.is_deleted,
                modification_notes: req.user.modification_notes
            };
            this.user_service.updateUser(user_params, (err) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('user was updated successfully', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user_service.deleteUser(req.user._id, (err, delete_details) => {
                if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('user was deleted successfully', null, res);
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        });
    }
}
exports.UserController = UserController;
