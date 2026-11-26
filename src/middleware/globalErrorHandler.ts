import type { NextFunction, Request, Response } from "express";

interface AppError extends Error {
    status?: number,
    statusCode?: number,
}

export const globalErrorHandler = ((err: AppError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid data provided";
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
});