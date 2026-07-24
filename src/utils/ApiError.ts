import { StatusCodes } from "http-status-codes";

class ApiError extends Error {
  statusCode: number;

  constructor(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = "Internal Server Error"
  ) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;