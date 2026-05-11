import type { WatchlistStatus } from "../generated/prisma/enums.js";

export type WatchListItemDTO = {
  movieId: string;
  userId: string;
  status: WatchlistStatus;
  rating: number;
  notes: string;
};
