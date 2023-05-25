import { BoardPositions } from "../@types";
import { getPieceName } from "./utils";

export const canMoveOneStepForward = (
  board: BoardPositions,
  player: "w" | "b",
  row: number,
  column: string
) => {
  const whiteNextRow = row + 1;
  const blackNextRow = row - 1;
  return (
    getPieceName(
      board,
      `${column}${player === "b" ? blackNextRow : whiteNextRow}`
    ) === null
  );
};

export const canMoveTwoStepForward = (
  board: BoardPositions,
  player: "w" | "b",
  row: number,
  column: string
) => {
  const isAtOriginalPosition = player === "b" ? row === 7 : row === 2;
  const whiteNextRow = 4;
  const blackNextRow = 5;
  const isEmptyPosition =
    getPieceName(
      board,
      `${column}${player === "b" ? blackNextRow : whiteNextRow}`
    ) === null;
  return isAtOriginalPosition && isEmptyPosition;
};
