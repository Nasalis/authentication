import { WatchlistStatus } from "../@types/watchlistStatus.js";

export type WatchListItemDTO = {
  movieId: string;
  userId: string;
  status: typeof WatchlistStatus;
  rating: number;
  notes: string;
};
