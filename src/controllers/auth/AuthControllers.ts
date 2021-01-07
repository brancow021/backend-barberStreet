import { Request, Response, Router } from "express";
import BarberModel from "../../models/Barber";

class AuthControllers {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async authUser(req: Request, res: Response) {
    let body = req.body;
    const { username, password } = body;

    await BarberModel.find({ username } && { password })
      .then((data) => {
        res.status(200).json({
          ok: true,
          data,
        });
      })
      .catch(console.error);
  }

  public routes() {
    this.router.post("/auth/login", this.authUser);
  }
}

const authControllers = new AuthControllers();

export default authControllers.router;
