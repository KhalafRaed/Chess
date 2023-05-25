import { Schema, model, Document, Model, Types } from "mongoose";
import { initialChessBoard } from "../shared/constants";
import {
  BoardMoveLog,
  BoardPositions,
  ChessGameStatus,
  ChessPlayer,
} from "../@types";

interface ChessGameDocument extends Document {
  board: BoardPositions;
  turn: ChessPlayer;
  status: ChessGameStatus;
  history: BoardMoveLog[];
}

const chessGameSchema = new Schema<ChessGameDocument>({
  board: {
    type: Map,
    of: Object,
    default: initialChessBoard,
  },
  turn: { type: String, default: ChessPlayer.WHITE },
  status: { type: String, default: ChessGameStatus.ACTIVE },
  history: {
    type: [
      {
        at: { type: Date },
        piece: { type: String },
        fromPosition: String,
        toPosition: String,
      },
    ],
    default: [],
  },
});

export const ChessGame = model<ChessGameDocument>("ChessGame", chessGameSchema);
