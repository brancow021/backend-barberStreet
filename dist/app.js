"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body = __importStar(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const AuthControllers_1 = __importDefault(require("./controllers/auth/AuthControllers"));
const VerifySmsControllers_1 = __importDefault(require("./controllers/sms/VerifySmsControllers"));
const registerBarberControllers_1 = __importDefault(require("./controllers/registerBarber/registerBarberControllers"));
class Server {
    constructor() {
        this.urlDb = "mongodb://localhost/streetBarber";
        this.app = express_1.default();
        this.port = process.env.PORT || "3000";
        this.middlewares();
        this.databaseConfig();
        this.routes();
    }
    middlewares() {
        this.app.use(body.urlencoded({ extended: false }));
        this.app.use(body.json());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use("/api", AuthControllers_1.default);
        this.app.use("/api", VerifySmsControllers_1.default);
        this.app.use("/api", registerBarberControllers_1.default);
    }
    databaseConfig() {
        mongoose_1.default
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
const server = new Server();
server.start();
//# sourceMappingURL=app.js.map