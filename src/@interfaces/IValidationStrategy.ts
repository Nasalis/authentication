import type { NextFunction, Request, Response } from "express";

export interface IValidationStrategy {
  validate(request: Request, response: Response, next: NextFunction): void;
}
