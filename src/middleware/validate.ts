import type { NextFunction, Request, Response } from "express";
import type { IValidationStrategy } from "../@interfaces/IValidationStrategy.js";

export class Validate {
  constructor(private strategy: IValidationStrategy) {
    this.strategy = strategy;
  }

  public handle() {
    return (request: Request, response: Response, next: NextFunction) => {
      this.strategy.validate(request, response, next);
    };
  }
}
