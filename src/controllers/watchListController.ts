import type { Request, Response } from "express";
import { WatchListService } from "../services/WatchListService.js";
import { GetError } from "../utils/getError.js";
import type { WatchListItemDTO } from "../@dto/WatchListItemDTO.js";

export class WatchListController {
  private readonly service: WatchListService;

  constructor() {
    this.service = new WatchListService();
  }

  public addToWatchList = async (request: Request, response: Response) => {
    try {
      const movieInfo = request.body as WatchListItemDTO;

      const addedMovie = await this.service.addToWatchList({
        ...movieInfo,
        userId: request.user?.id!,
      });

      response.status(201).json({ status: "success", data: addedMovie });
    } catch (error: any) {
      response
        .status(error?.cause?.status ?? 400)
        .json({ message: GetError.getMessage(error) });
    }
  };

  public updateWatchList = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const userId = request.user?.id!;
      const content = request.body;

      const updatedData = this.service.updateItem(
        id as string,
        userId,
        content,
      );

      response.status(200).json({ status: "success", data: updatedData });
    } catch (error: any) {
      response
        .status(error?.cause?.status ?? 400)
        .json({ message: GetError.getMessage(error) });
    }
  };

  public deleteFromWatchList = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      await this.service.removeItem(id as string, request.user?.id!);

      response
        .status(200)
        .json({ status: "success", message: "Movie removed from watchlist" });
    } catch (error: any) {
      response
        .status(error?.cause?.status ?? 400)
        .json({ message: GetError.getMessage(error) });
    }
  };
}
