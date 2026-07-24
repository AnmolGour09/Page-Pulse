import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import axios from "axios";
import ApiError from "../utils/ApiError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
      },
    });
  }

  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: {
        message: err.issues[0].message,
      },
    });
  }

  if (axios.isAxiosError(err)) {
    return res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      error: {
        message: "Failed to fetch website",
      },
    });
  }

  console.error(err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      message: "Internal Server Error",
    },
  });
}