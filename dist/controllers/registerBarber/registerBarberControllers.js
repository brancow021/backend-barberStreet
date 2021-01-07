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
class RegisterControllers {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req === null || req === void 0 ? void 0 : req.body;
            let usernameGenerate = `${body.name}${body.identityDocument}${Math.floor(1000 + Math.random() * 9000)}`;
            let passwordGenerate = `${body.identityDocument}${body.name}${Math.floor(1000 + Math.random() * 9000)}`;
            console.log(usernameGenerate);
            console.log(passwordGenerate);
            let barberInfo = new Barber_1.default(Object.assign(Object.assign({}, body), { "dataAuth.username": usernameGenerate, "dataAuth.password": passwordGenerate }));
            barberInfo
                .save()
                .then((info) => {
                res.status(200).json({
                    ok: true,
                    message: "Registrado Correctamente",
                    data: info,
                });
            })
                .catch((err) => {
                res.status(403).json({
                    ok: false,
                    message: "Ah ocurrido un error",
                    err,
                });
            });
        });
    }
    routes() {
        this.router.post("/register-barber", this.registerUser);
    }
}
const registerControllers = new RegisterControllers();
exports.default = registerControllers.router;
//# sourceMappingURL=registerBarberControllers.js.map