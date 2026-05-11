import type { NextFunction, Request, Response } from "express";
import { GetError } from "../utils/getError.js";
import { JWTToken } from "../utils/generateToken.js";
import { UserRepository } from "../repositories/UserRepository.js";
import type { JwtPayload } from "jsonwebtoken";

export class AuthMiddeware {
  public static run = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const authorizationField = request.headers.authorization;
    let token = "";

    if (authorizationField && authorizationField.startsWith("Bearer")) {
      token = authorizationField.split(" ")[1]!;
    } else if (request.cookies?.jwt) {
      token = request.cookies.jwt;
    }

    if (!token) {
      return response
        .status(401)
        .json({ error: "Not authorized, no token provided" });
    }

    try {
      const { id } = JWTToken.verify(token) as JwtPayload;
      const user = await UserRepository.getUserById(id);

      if (!user) {
        throw new Error("User no longer exists", { cause: { status: 401 } });
      }

      request.user = user;
      next();
    } catch (error: any) {
      response
        .status(error?.cause?.status ?? 400)
        .json({ error: GetError.getMessage(error) });
    }
  };
}
