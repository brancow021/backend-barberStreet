import { Request, Response, Router } from "express";
import BarberModel from "../../models/Barber";

class RegisterControllers {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public async registerUser(req: Request, res: Response) {
		let body = req?.body;

		let usernameGenerate = `${body.name}${body.identityDocument}${Math.floor(
			1000 + Math.random() * 9000,
		)}`;
		let passwordGenerate = `${body.identityDocument}${body.name}${Math.floor(
			1000 + Math.random() * 9000,
		)}`;

		console.log(usernameGenerate);
		console.log(passwordGenerate);

		let barberInfo = new BarberModel({
			...body,
			"dataAuth.username": usernameGenerate,
			"dataAuth.password": passwordGenerate,
		});
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
	}

	public routes() {
		this.router.post("/register-barber", this.registerUser);
	}
}

const registerControllers = new RegisterControllers();

export default registerControllers.router;
