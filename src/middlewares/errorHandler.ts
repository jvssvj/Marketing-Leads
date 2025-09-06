import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  } else if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  } else {
    return res.status(500).json({ message: "Internal server error." });
  }
};
