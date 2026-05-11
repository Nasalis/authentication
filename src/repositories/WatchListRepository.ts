import type { WatchListItemDTO } from "../@dto/WatchListItemDTO.js";
import { PrismaORM } from "../config/database.js";

export class WatchListRepository {
  public static async getItem(id: string) {
    return await PrismaORM.instance.getClient.watchlistItem.findUnique({
      where: { id: id },
    });
  }

  public static async updateItem(id: string, content: WatchListItemDTO) {
    return await PrismaORM.instance.getClient.watchlistItem.update({
      where: { id: id },
      data: {
        notes: content.notes,
        rating: content.rating,
        status: content.status,
      },
    });
  }

  public static async deleteItem(id: string) {
    return await PrismaORM.instance.getClient.watchlistItem.delete({
      where: { id: id },
    });
  }

  public static async getMovieFromListById(userId: string, movieId: string) {
    return await PrismaORM.instance.getClient.watchlistItem.findUnique({
      where: {
        userId_movieId: {
          userId: userId,
          movieId: movieId,
        },
      },
    });
  }

  public static async addItem(item: WatchListItemDTO) {
    return await PrismaORM.instance.getClient.watchlistItem.create({
      data: item,
    });
  }
}
