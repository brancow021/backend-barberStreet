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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Barber_1 = __importDefault(require("../../models/Barber"));
class AuthControllers {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    authUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            const { username, password } = body;
            yield Barber_1.default.find({ username } && { password })
                .then((data) => {
                res.status(200).json({
                    ok: true,
                    data,
                });
            })
                .catch(console.error);
        });
    }
    routes() {
        this.router.post("/auth/login", this.authUser);
    }
}
const authControllers = new AuthControllers();
exports.default = authControllers.router;
//# sourceMappingURL=AuthControllers.js.map