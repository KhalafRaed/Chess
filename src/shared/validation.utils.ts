import { Position } from "../@types";

export const isPositionValid = (position: Position) => {
  return (
    position.row >= 1 &&
    position.row <= 8 &&
    ["A", "B", "C", "D", "E", "F", "G", "H"].includes(position.column)
  );
};

export const validatePosition = (positionName: string) => {
  return (
    positionName &&
    positionName.length === 2 &&
    ["A", "B", "C", "D", "E", "F", "G", "H"].includes(positionName.charAt(0)) &&
    +positionName.charAt(1) >= 1 &&
    +positionName.charAt(1) <= 8
  );
};
