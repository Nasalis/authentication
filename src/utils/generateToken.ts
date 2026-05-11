import jwt from "jsonwebtoken";

abstract class TokenGenerator {
  static generate: (id: string) => string;
}

export class JWTToken implements TokenGenerator {
  public static generate(id: string) {
    const secret = process.env.JWT_SECRET!;
    const expires = process.env.JWT_EXPIRES_IN! as jwt.SignOptions["expiresIn"];

    const token = jwt.sign({ id }, secret, {
      expiresIn: expires ?? "7d",
    });

    return token;
  }

  public static verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
