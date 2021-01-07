import { Request, Response, Router } from "express";
import Barber from "../../models/Barber";
const accountSid = "AC32edcbbe4a6dbf427e475ac4db3a9130";
const authToken = "786711424193b866e777d5a4b445581b";

const client = require("twilio")(accountSid, authToken);

class SmsVerify {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public async requestNumberPhone(req: Request, res: Response) {
		let { number } = req.body;

		if (number) {
			await Barber.find({ phone: number })
				.exec()
				.then(async (barbersPhone) => {
					if (barbersPhone.length === 0) {
						await client.verify
							.services("VAc6b1819f75156a1f7cccaf0ad7cd4687")
							.verifications.create({
								to: number,
								channel: "sms",
							})

							.then((verification: any) => {
								res.json({
									ok: true,
									message: "Mensaje enviado",
									verification,
								});
							});
					} else {
						res.status(500).json({
							ok: false,
							message: "Numero de telefono ya ah sido usado",
						});
					}
				})
				.catch((err) => {
					res.status(404).json({
						ok: false,
						err,
					});
				});
		} else {
			res.status(404).json({
				ok: false,
				message: "number phone is required",
			});
		}
	}

	public async verifyCodeSms(req: Request, res: Response) {
		if (req.body.code && req.body.number) {
			let { code, number } = req.body;

			await client.verify
				.services("VAc6b1819f75156a1f7cccaf0ad7cd4687")
				.verificationChecks.create({
					to: number,
					code: code,
				})
				.then((verification_check: any) => {
					console.log(verification_check);

					res.status(500).json({
						ok: true,
						message: "Verificacion exitosa",
						verification_check,
					});
				})
				.catch((err: any) => {
					res.status(500).json({
						ok: false,
						err,
					});
				});
		} else {
			res.status(404).json({
				ok: false,
				message: "code and number phone is required",
			});
		}
	}

	public routes() {
		this.router.post("/requestNumberPhone", this.requestNumberPhone);
		this.router.post("/verify-code-sms", this.verifyCodeSms);
	}
}

let smsVerify = new SmsVerify();

export default smsVerify.router;
