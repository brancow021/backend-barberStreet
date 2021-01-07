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
const accountSid = "AC32edcbbe4a6dbf427e475ac4db3a9130";
const authToken = "786711424193b866e777d5a4b445581b";
const client = require("twilio")(accountSid, authToken);
class SmsVerify {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    requestNumberPhone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { number } = req.body;
            if (number) {
                yield Barber_1.default.find({ phone: number })
                    .exec()
                    .then((barbersPhone) => __awaiter(this, void 0, void 0, function* () {
                    if (barbersPhone.length === 0) {
                        yield client.verify
                            .services("VAc6b1819f75156a1f7cccaf0ad7cd4687")
                            .verifications.create({
                            to: number,
                            channel: "sms",
                        })
                            .then((verification) => {
                            res.json({
                                ok: true,
                                message: "Mensaje enviado",
                                verification,
                            });
                        });
                    }
                    else {
                        res.status(500).json({
                            ok: false,
                            message: "Numero de telefono ya ah sido usado",
                        });
                    }
                }))
                    .catch((err) => {
                    res.status(404).json({
                        ok: false,
                        err,
                    });
                });
            }
            else {
                res.status(404).json({
                    ok: false,
                    message: "number phone is required",
                });
            }
        });
    }
    verifyCodeSms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.code && req.body.number) {
                let { code, number } = req.body;
                yield client.verify
                    .services("VAc6b1819f75156a1f7cccaf0ad7cd4687")
                    .verificationChecks.create({
                    to: number,
                    code: code,
                })
                    .then((verification_check) => {
                    console.log(verification_check);
                    res.status(500).json({
                        ok: true,
                        message: "Verificacion exitosa",
                        verification_check,
                    });
                })
                    .catch((err) => {
                    res.status(500).json({
                        ok: false,
                        err,
                    });
                });
            }
            else {
                res.status(404).json({
                    ok: false,
                    message: "code and number phone is required",
                });
            }
        });
    }
    routes() {
        this.router.post("/requestNumberPhone", this.requestNumberPhone);
        this.router.post("/verify-code-sms", this.verifyCodeSms);
    }
}
let smsVerify = new SmsVerify();
exports.default = smsVerify.router;
//# sourceMappingURL=VerifySmsControllers.js.map