import express from "express";
import * as body from "body-parser";
import mongoose from "mongoose";
import compression from 'compression'
import cors from 'cors';
import authControllers from "./controllers/auth/AuthControllers";
import verifySms from "./controllers/sms/VerifySmsControllers";
import registerControllers from './controllers/registerBarber/registerBarberControllers'

class Server {
	public app: express.Application;
	public port: string;
	private urlDb: string = "mongodb://localhost/streetBarber";

	constructor() {
		this.app = express();
		this.port = process.env.PORT || "3000";
		this.middlewares();
		this.databaseConfig();
		this.routes();
	}

	middlewares() {
		this.app.use(body.urlencoded({ extended: false }));
		this.app.use(body.json());
		this.app.use(compression());
		this.app.use(cors());
	}

	routes() {
		this.app.use("/api", authControllers);
		this.app.use("/api", verifySms);
		this.app.use("/api", registerControllers)
	}

	databaseConfig() {
		mongoose
			.connect(this.urlDb, {
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			})
			.then(() => console.log("Database is connected"))
			.catch(console.log);
	}

	start() {
		this.app.listen(this.port, () => {
			console.log(`Server running in the port ${this.port}`);
		});
	}
}

const server: Server = new Server();
server.start();
