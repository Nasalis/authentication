import type { UserDTO } from "../@dto/UserDTO.js";
import { PrismaORM } from "../config/database.js";

export class UserRepository {
  public static async getUserByEmail(email: string) {
    return await PrismaORM.instance.getClient.user.findUnique({
      where: { email: email },
    });
  }

  public static async getUserById(id: string): Promise<UserDTO> {
    return (await PrismaORM.instance.getClient.user.findUnique({
      where: { id: id },
    })) as UserDTO;
  }

  public static async createUser(info: {
    name: string;
    email: string;
    password: string;
  }) {
    return await PrismaORM.instance.getClient.user.create({ data: info });
  }
}
