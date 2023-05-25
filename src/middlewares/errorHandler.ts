import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  message: string;
  statusCode: number;
}

const errorHandlerMiddleware = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandlerMiddleware;
