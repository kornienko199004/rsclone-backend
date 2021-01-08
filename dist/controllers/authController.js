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
exports.AuthController = void 0;
const service_1 = require("../modules/common/service");
const schema_1 = require("../modules/users/schema");
const bcrypt_1 = require("bcrypt");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.email && req.body.password) {
                try {
                    const user = yield schema_1.default.findOne({ email: req.body.email });
                    if (!user) {
                        throw new Error('Unable to login');
                    }
                    const isMatch = yield bcrypt_1.compare(req.body.password, user.password);
                    if (!isMatch) {
                        throw new Error('Unable to login');
                    }
                    const token = yield user.generateAuthToken();
                    res.send({ user: user.getPublicProfile(), token });
                }
                catch (err) {
                    service_1.mongoError(err, res);
                }
            }
            else {
                // error response if some fields are missing in request body
                service_1.insufficientParameters(res);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req) {
                try {
                    console.log(req.user);
                    console.log(req.user);
                    req.user.tokens = req.user.tokens.filter((token) => {
                        token.token !== req.token;
                    });
                    yield req.user.save();
                    res.send();
                }
                catch (err) {
                    service_1.mongoError(err, res);
                }
            }
            else {
                // error response if some fields are missing in request body
                service_1.insufficientParameters(res);
            }
        });
    }
}
exports.AuthController = AuthController;
