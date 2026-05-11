import { Router } from "express";
import { WatchListController } from "../controllers/watchListController.js";
import { AuthMiddeware } from "../middleware/auh.js";
import { Validate } from "../middleware/validate.js";
import { ZodValidationStrategy } from "../strategies/ZodValidationStrategy.js";
import { addWatchlistSchema } from "../validators/watchlistValidators.js";

export class WatchListRoutes {
  private readonly _router: Router;
  private readonly controller: WatchListController;

  constructor() {
    this._router = Router();
    this.controller = new WatchListController();

    this.routes();
  }

  private routes() {
    const addWatchlistValidator = new Validate(
      new ZodValidationStrategy(addWatchlistSchema),
    );

    this._router.use(AuthMiddeware.run);
    this._router.post(
      "/",
      addWatchlistValidator.handle(),
      this.controller.addToWatchList,
    );
    this._router.put("/:id", this.controller.updateWatchList);
    this._router.delete("/:id", this.controller.deleteFromWatchList);
  }

  public get router() {
    return this._router;
  }
}
