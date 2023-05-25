import express, { Request, Response } from "express";
import { Types } from "mongoose";
import { ChessPiece, UpdatePiecePosition } from "../@types";
import { ChessGame } from "../models/chessGame";
import { validateChessGameId } from "../middlewares/ValidateChessGameID";
import { findNextPossibleMoves, getPieceName } from "../shared/utils";
import { validatePositionName } from "../middlewares/validatePositionName";
import { validatePosition } from "../shared/validation.utils";

const router = express.Router();

router.post("/1.0/chess", async (req: Request, res: Response) => {
  try {
    const chessGame = new ChessGame();
    await chessGame.save();
    res.status(200).json(chessGame);
  } catch (error) {
    console.error("Error creating a new game:", error);
    res.status(500).json({ message: "Failed to create a new game." });
  }
});

router.get(
  "/1.0/chess/history/:gameId",
  validateChessGameId,
  async (req: Request, res: Response) => {
    try {
      const gameId = req.params.gameId;
      const chessGame = await ChessGame.findOne({
        _id: new Types.ObjectId(gameId),
      });
      if (!chessGame) {
        return res
          .status(404)
          .json({ message: `Chess game not found with ID: ${gameId}` });
      }
      res.status(200).json(chessGame.history);
    } catch (err) {
      console.error("Error fetching game from database:", err);
      res.status(500).json({ message: "Failed to create a new game." });
    }
  }
);
router.get(
  "/1.0/chess/:gameId",
  validateChessGameId,
  async (req: Request, res: Response) => {
    try {
      const gameId = req.params.gameId;
      const chessGame = await ChessGame.findOne({
        _id: new Types.ObjectId(gameId),
      });
      if (!chessGame) {
        return res
          .status(404)
          .json({ message: `Chess game not found with ID: ${gameId}` });
      }
      res.status(200).json(chessGame);
    } catch (err) {
      console.error("Error fetching game from database:", err);
      res.status(500).json({ message: "Failed to create a new game." });
    }
  }
);

router.get(
  "/1.0/chess/possible-moves/:gameId/:positionName",
  validateChessGameId,
  validatePositionName,
  async (req: Request, res: Response) => {
    const { gameId, positionName } = req.params;
    const chessGame = await ChessGame.findOne({
      _id: new Types.ObjectId(gameId),
    });
    if (!chessGame) {
      console.error("Chess game not found with ID");

      return res
        .status(404)
        .json({ message: `Chess game not found with ID: ${gameId}` });
    }
    const chessGameObj = chessGame.toObject();
    const { board } = chessGameObj;

    const pieceName = getPieceName(board, positionName);

    if (!pieceName) {
      console.error("Position is Empty");
      return res.status(400).json({ message: `Position is Empty` });
    } else {
      if (pieceName.charAt(1) !== "P") {
        console.error("We don't support moving pieces other than Pawn 'P'");

        return res.status(400).json({
          message: `We don't support moving pieces other than Pawn 'P'`,
        });
      }

      const nextPositions = findNextPossibleMoves(
        board,
        pieceName,
        positionName
      );
      res.status(200).json(nextPositions);
    }
  }
);

router.put(
  "/1.0/chess/move/:gameId",
  validateChessGameId,
  async (req: Request, res: Response) => {
    const { position, nextPosition } = req.body as UpdatePiecePosition;
    if (
      !position ||
      !nextPosition ||
      !validatePosition(position) ||
      !validatePosition(nextPosition)
    ) {
      console.error("Position and next Position are required");
      return res.status(400).json({ message: `Position is Empty or invalid` });
    }
    const { gameId } = req.params;

    const chessGame = await ChessGame.findOne({
      _id: new Types.ObjectId(gameId),
    });
    if (!chessGame) {
      console.error("Chess game not found with ID");

      return res
        .status(404)
        .json({ message: `Chess game not found with ID: ${gameId}` });
    }
    const chessGameObj = chessGame.toObject();
    const { board } = chessGameObj;

    const firstPositionPieceName = getPieceName(board, position);
    const nextPositionPieceName = getPieceName(board, nextPosition);

    if (!firstPositionPieceName) {
      console.error("provided position is empty");
      return res.status(400).json({ message: `provided position is empty` });
    }

    if (
      nextPositionPieceName &&
      nextPosition.charAt(0) === position.charAt(0)
    ) {
      console.error("next position is already occupied");
      return res
        .status(400)
        .json({ message: `next position is already occupied` });
    }

    if (firstPositionPieceName.charAt(1) !== "P") {
      console.error("We don't support moving pieces other than Pawn 'P'");

      return res.status(400).json({
        message: `We don't support moving pieces other than Pawn 'P'`,
      });
    }
    const nextAvailablePositions = findNextPossibleMoves(
      board,
      firstPositionPieceName,
      position
    );

    let canMoveToPosition = false;
    nextAvailablePositions.forEach((availablePosition) => {
      if (availablePosition.nextPosition === nextPosition) {
        canMoveToPosition = true;
      }
    });

    if (!canMoveToPosition) {
      console.error("its not allowed to move to the provided next position");

      return res.status(400).json({
        message: `its not allowed to move to the provided next position`,
      });
    }

    // @ts-ignore
    chessGame.board.set(position, null);
    // @ts-ignore
    chessGame.board.set(nextPosition, firstPositionPieceName);
    chessGame.history.push({
      piece: firstPositionPieceName as ChessPiece,
      toPosition: nextPosition,
      fromPosition: position,
      at: new Date(),
    });
    await chessGame.save();
    return res.status(200).json(chessGame);
  }
);

export default router;
