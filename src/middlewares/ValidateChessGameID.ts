import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export function validateChessGameId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { gameId } = req.params;
  if (!Types.ObjectId.isValid(gameId)) {
    return res.status(400).json({
      error: "Invalid path param: gameId should be valid ObjectId",
    });
  }
  next();
}
