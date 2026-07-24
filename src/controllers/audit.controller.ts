import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

import { auditSchema } from "../validators/audit.validator";
import { auditService } from "../services/audit.service";

export const auditWebsite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const validatedData = auditSchema.parse(req.body);

    const result = await auditService(validatedData.url);

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    if (axios.isAxiosError(error)) {

      if (
        error.code === "ECONNABORTED" ||
        error.code === "ETIMEDOUT"
      ) {

        return void res.status(StatusCodes.GATEWAY_TIMEOUT).json({
          success: false,
          error: {
            code: "REQUEST_TIMEOUT",
            message: "The target website took too long to respond.",
          },
        });

      }

      return void res.status(StatusCodes.BAD_GATEWAY).json({
        success: false,
        error: {
          code: "FETCH_FAILED",
          message: error.message,
        },
      });

    }

    if (error.name === "ZodError") {

      return void res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: {
          code: "INVALID_URL",
          message: "Please provide a valid HTTP or HTTPS URL.",
        },
      });

    }

    return void res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong.",
      },
    });

  }
};