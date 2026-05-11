import bcrypt from "bcryptjs";
import { PrismaORM } from "../config/database.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { JWTToken } from "../utils/generateToken.js";

export class AuthService {
  constructor() {}

  public async registerUser(info: {
    name: string;
    email: string;
    password: string;
  }) {
    const userAlreadyExists = await UserRepository.getUserByEmail(info.email);

    if (userAlreadyExists) {
      throw new Error("User already exists with this email");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(info.password, salt);

    // Create User
    const user = await UserRepository.createUser({
      name: info.name,
      email: info.email,
      password: hash,
    });

    return user;
  }

  public async doLogin(info: { email: string; password: string }) {
    const userExists = await UserRepository.getUserByEmail(info.email);

    if (!userExists) {
      throw new Error("Invalid email or password", {
        cause: { status: 401 },
      });
    }

    const isPasswordValid = await bcrypt.compare(
      info.password,
      userExists.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password", {
        cause: { status: 401 },
      });
    }

    // Generate JWT Token
    const token = JWTToken.generate(userExists.id);

    return {
      userExists,
      token,
    };
  }
}
