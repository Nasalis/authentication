import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

export class AuthRoutes {
  private readonly _router: Router;
  private readonly controller: AuthController;

  constructor() {
    this._router = Router();
    this.controller = new AuthController();

    this.routes();
  }

  private routes() {
    this._router.post("/register", this.controller.register);
    this._router.post("/login", this.controller.login);
    this._router.post("/logout", this.controller.logout);
  }

  public get router() {
    return this._router;
  }
}
