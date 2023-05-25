export enum ChessGameStatus {
  ACTIVE = "Active",
  FINISHED = "Finished",
}

export enum ChessPlayer {
  WHITE = "White",
  BLACK = "Black",
}

export enum ChessPiece {
  King = "K",
  Queen = "Q",
  Bishop = "B",
  Knight = "N",
  Rook = "R",
  Pawn = "P",
}

export type BoardMoveLog = {
  at: Date;
  piece: ChessPiece;
  fromPosition: string;
  toPosition: string;
};

export type NextPossibleMove = {
  nextPosition: string;
  isCapture: boolean;
};

export type Column = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";

export type Position = {
  row: number;
  column: Column;
};

export type BoardPositions = { [key: string]: string | null };

export type UpdatePiecePosition = {
  position: string;
  nextPosition: string;
};
