import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export function validatePositionName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { positionName } = req.params;

  /**
   * Validation roles:
   * 1. two characters
   * 2. first character is of type Column
   * 3. second number is between [1, 8]
   */
  if (positionName && positionName.length === 2) {
    if (
      ["A", "B", "C", "D", "E", "F", "G", "H"].includes(
        positionName.charAt(0)
      ) &&
      +positionName.charAt(1) >= 1 &&
      +positionName.charAt(1) <= 8
    ) {
      next();
    } else {
      return res.status(400).json({
        error:
          "Invalid path param: pieceName should start with 'b' or 'w' and ends with 'K', 'Q', 'B', 'N', 'R' or 'P'",
      });
    }
  } else {
    return res.status(400).json({
      error: "Invalid path param: pieceName should be only 2 characters",
    });
  }
}
