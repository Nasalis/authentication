import type { Request, Response } from "express";
import { GetError } from "../utils/getError.js";
import { AuthService } from "../services/AuthServices.js";

export class AuthController {
  private readonly service: AuthService;

  constructor() {
    this.service = new AuthService();
  }
  public register = async (request: Request, response: Response) => {
    try {
      const { name, email, password } = request.body;

      const createdUser = await this.service.registerUser({
        name,
        email,
        password,
      });

      console.log("Created", createdUser);

      response.status(200).json({ status: "success", data: createdUser });
    } catch (error) {
      response.status(400).json({ message: GetError.getMessage(error) });
    }
  };

  public login = async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const { userExists, token } = await this.service.doLogin({
        email,
        password,
      });

      response.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
      });
      response.status(200).json({ status: "success", user: userExists, token });
    } catch (error: any) {
      response
        .status(error?.cause?.status || 400)
        .json({ message: GetError.getMessage(error) });
    }
  };

  public logout = async (request: Request, response: Response) => {
    response.cookie("jwt", "", {
      expires: new Date(0),
    });
    response.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  };
}
