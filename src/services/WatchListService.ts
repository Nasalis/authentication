import type { WatchListItemDTO } from "../@dto/WatchListItemDTO.js";
import { MovieRepository } from "../repositories/MovieRepository.js";
import { WatchListRepository } from "../repositories/WatchListRepository.js";

export class WatchListService {
  constructor() {}

  public async addToWatchList(info: WatchListItemDTO) {
    const movie = await MovieRepository.getMovieById(info.movieId);

    if (!movie) {
      throw new Error("Movie not found", { cause: { status: 404 } });
    }

    const movieAlreadyExists = await WatchListRepository.getMovieFromListById(
      info.userId,
      info.movieId,
    );

    if (movieAlreadyExists) {
      throw new Error("Movie already in the watchlist");
    }

    const watchListItem = await WatchListRepository.addItem({
      ...info,
      status: info.status || "PLANNED",
    });

    return watchListItem;
  }

  public async updateItem(
    id: string,
    userId: string,
    content: WatchListItemDTO,
  ) {
    const watchList = await WatchListRepository.getItem(id);

    if (!watchList) {
      throw new Error("Watchlist not found", { cause: { status: 404 } });
    }

    if (watchList.userId !== userId) {
      throw new Error("Not allowed to update this watchlist item", {
        cause: { status: 403 },
      });
    }

    const udpateData = await WatchListRepository.updateItem(id, content);

    return udpateData;
  }

  public async removeItem(id: string, userId: string) {
    const wachList = await WatchListRepository.getItem(id);

    if (!wachList) {
      throw new Error("Watchlist not found", { cause: { status: 404 } });
    }

    if (wachList.userId !== userId) {
      throw new Error("Not allowed to update this watchlist item", {
        cause: { status: 403 },
      });
    }

    await WatchListRepository.deleteItem(id);
  }
}
