import { BoardPositions, Column, NextPossibleMove, Position } from "../@types";
import { canMoveOneStepForward, canMoveTwoStepForward } from "./move.utils";
import { isPositionValid } from "./validation.utils";

export const findNextPossibleMoves = (
  board: BoardPositions,
  pieceName: string,
  currentPiecePosition: string
): NextPossibleMove[] => {
  const column = currentPiecePosition.charAt(0);
  const row = +currentPiecePosition.charAt(1);

  const player = pieceName.charAt(0) as "w" | "b"; // either 'w' or 'b'

  // Analyze if the Pawn can capture the opponent piece
  const captureStatus = analyzeCaptureOpponentPiece(board, player, row, column);

  const canMoveForwardOneStep = canMoveOneStepForward(
    board,
    player,
    row,
    column
  );
  const canMoveForwardTwoSteps = canMoveTwoStepForward(
    board,
    player,
    row,
    column
  );

  const moves: NextPossibleMove[] = [];

  // Add Left Capture if Pawn can
  if (captureStatus.canCaptureLeft) {
    moves.push({
      nextPosition:
        captureStatus.leftPosition.column + captureStatus.leftPosition.row,
      isCapture: captureStatus.canCaptureLeft,
    });
  }

  // Add Right Capture if Pawn can
  if (captureStatus.canCaptureRight) {
    moves.push({
      nextPosition:
        captureStatus.rightPosition.column + captureStatus.rightPosition.row,
      isCapture: captureStatus.canCaptureRight,
    });
  }

  // Add 1 Step forward if valid
  if (canMoveForwardOneStep) {
    moves.push({
      nextPosition: column + (row + 1),
      isCapture: false,
    });
  }

  // Add 2 Step forward if valid
  if (canMoveForwardTwoSteps) {
    moves.push({
      nextPosition: column + (row + 2),
      isCapture: false,
    });
  }
  return moves;
};

export const getPieceName = (board: BoardPositions, position: string) => {
  // @ts-ignore
  return board.get(position);
};

const analyzeCaptureOpponentPiece = (
  board: BoardPositions,
  player: "w" | "b",
  row: number,
  column: string
) => {
  const oppositePlayer = player === "b" ? "w" : "b";

  const rightCapturePosition: Position = {
    row: player === "b" ? row - 1 : row + 1,
    column: String.fromCharCode(
      column.charCodeAt(0) - (player === "b" ? 1 : -1)
    ) as Column,
  };
  const leftCapturePosition: Position = {
    row: player === "b" ? row - 1 : row + 1,
    column: String.fromCharCode(
      column.charCodeAt(0) - (player === "b" ? -1 : 1)
    ) as Column,
  };

  const canCapture = {
    canCaptureRight: false,
    canCaptureLeft: false,
    canMoveRight: false,
    canMoveLeft: false,
    rightPosition: rightCapturePosition,
    leftPosition: leftCapturePosition,
  };

  const isRightDiagonalMoveValid = isPositionValid(rightCapturePosition);
  const isLeftDiagonalMoveValid = isPositionValid(leftCapturePosition);

  if (isRightDiagonalMoveValid) {
    // @ts-ignore
    const rightDiagonalPiece = board.get(
      rightCapturePosition.column + rightCapturePosition.row
    );
    const isThereOpponentPieceOnRight =
      rightDiagonalPiece && rightDiagonalPiece.charAt(0) === oppositePlayer;
    canCapture.canCaptureRight = !!isThereOpponentPieceOnRight;
    canCapture.canMoveRight = true;
  }

  if (isLeftDiagonalMoveValid) {
    // @ts-ignore
    const leftDiagonalPiece = board.get(
      leftCapturePosition.column + leftCapturePosition.row
    );
    const isThereOpponentPieceOnLeft =
      leftDiagonalPiece && leftDiagonalPiece.charAt(0) === oppositePlayer;
    canCapture.canCaptureLeft = !!isThereOpponentPieceOnLeft;
    canCapture.canMoveLeft = true;
  }

  return canCapture;
};
