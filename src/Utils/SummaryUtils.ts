import { UUID } from "crypto";
import ShiftType from "../Models/ShiftType";
import User from "../Models/User";

type NumShiftsKey = `${UUID}-${"normal" | "weekend"}`;

interface NumShifts {
  [key: NumShiftsKey]: number;
}

export interface Data extends NumShifts {
  id: string;
  fullName: string;
  overall: number;
  score: number;
}

function createData(
  id?: string,
  fullName = "",
  allShiftTypes: ShiftType[] = [],
  numShifts: NumShifts = {},
  overall = 0,
  score = 0
): Data {
  const newShiftNums = allShiftTypes.reduce<NumShifts>(
    (prev, curr) => ({
      ...prev,
      [`${curr.id}-normal`]: 0,
      [`${curr.id}-weekend`]: 0,
    }),
    {}
  );
  return {
    id,
    fullName,
    ...newShiftNums,
    ...numShifts,
    overall,
    score,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function mapUserToSummary(user: User, allShiftTypes: ShiftType[]): Data {
  const data = createData(user.id, user.fullName, allShiftTypes);

  if (user.initialScores) {
    Object.keys(user.initialScores).forEach((score) => {
      data.score += user.initialScores[score];
    });
  }

  if (user.numShifts) {
    Object.keys(user.numShifts).forEach((key) => {
      const numShifts = user.numShifts[key];
      data.overall += numShifts;
      const shiftType = allShiftTypes.find((shiftType) => shiftType.id === key);
      data.score += numShifts * shiftType.score;
      data[`${key as UUID}-normal`] += numShifts;
    });
  }

  if (user.numWeekendShifts) {
    Object.keys(user.numWeekendShifts).forEach((key) => {
      const numShifts = user.numWeekendShifts[key];
      data.overall += numShifts;
      const shiftType = allShiftTypes.find((shiftType) => shiftType.id === key);
      data.score += numShifts * shiftType.weekendScore;
      data[`${key as UUID}-weekend`] += numShifts;
    });
  }

  return data;
}