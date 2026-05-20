import { WatchlistStatus } from "../@types/watchlistStatus.js";

export type WatchListItemDTO = {
  movieId: string;
  userId: string;
  status: WatchlistStatus;
  rating: number;
  notes: string;
};
