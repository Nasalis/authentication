import z from "zod";
import type { IValidationStrategy } from "../@interfaces/IValidationStrategy.js";
import type { NextFunction, Request, Response } from "express";

export class ZodValidationStrategy<T> implements IValidationStrategy {
  constructor(private readonly schema: z.ZodType<T>) {
    this.schema = schema;
  }

  validate(request: Request, response: Response, next: NextFunction): void {
    const validationResult = this.schema.safeParse(request.body);
    if (!validationResult.success) {
      response.status(400).json({
        error: "Validation failed",
        details: z.treeifyError(validationResult.error),
      });
      return;
    }
    request.body = validationResult.data as T;
    next();
  }
}
