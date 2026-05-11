import { PrismaORM } from "../config/database.js";

export class MovieRepository {
  public static async getMovieById(id: string) {
    return PrismaORM.instance.getClient.movie.findUnique({
      where: { id: id },
    });
  }
}
