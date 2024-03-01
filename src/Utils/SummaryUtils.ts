import { UUID } from 'crypto';
import ShiftType from '../Models/ShiftType';
import User, { NumShifts } from '../Models/User';

export type SplitBy = {
  type: boolean;
  day: boolean;
  home: boolean;
};

export type DayType = 'weekday' | 'weekend';

export type NumShiftsKeyPart = UUID | DayType | keyof NumShifts;

type NumShiftsKey = `${UUID}-${DayType}-${keyof NumShifts}`;

type DataNumShifts = {
  [key: NumShiftsKey]: number;
};

export type Data = DataNumShifts & {
  id: string;
  fullName: string;
  overall: number;
  score: number;
};

export type PartialDataKey =
| keyof Data
| NumShiftsKey
| NumShiftsKeyPart
| `${UUID}-${DayType}`
| `${UUID}-${keyof NumShifts}`
| `${DayType}-${keyof NumShifts}`;

export function calcId(
  splitBy: SplitBy,
  shiftType: UUID,
  dayType: DayType,
  home: keyof NumShifts
): PartialDataKey {
  return Object.values(splitBy).some((s) => s)
    ? (`${splitBy.type ? shiftType : ''}${
        splitBy.type && (splitBy.day || splitBy.home) ? '-' : ''
      }${splitBy.day ? dayType : ''}${splitBy.day && splitBy.home ? '-' : ''}${
        splitBy.home ? home : ''
      }` as PartialDataKey)
    : undefined;
}

function createData(
  id?: string,
  fullName = '',
  allShiftTypes: ShiftType[] = [],
  numShifts: DataNumShifts = {},
  overall = 0,
  score = 0
): Data {
  const newShiftNums = allShiftTypes.reduce<DataNumShifts>(
    (prev, curr) => ({
      ...prev,
      [`${curr.id}-weekday-normal`]: 0,
      [`${curr.id}-weekday-home`]: 0,
      [`${curr.id}-weekend-normal`]: 0,
      [`${curr.id}-weekend-home`]: 0,
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

export function getFieldValue(data: Data, field: PartialDataKey) {
  const splitOrderBy = field.split('-');

  return Object.keys(data)
    .filter((key) => splitOrderBy.every((s) => key.includes(s)))
    .map((key) => data[key as keyof Data])
    .reduce<number | string>(
      (sum, current) =>
        typeof current === 'string' || typeof sum === 'string'
          ? current
          : sum + current,
      0
    );
}

function descendingComparator(a: Data, b: Data, orderBy: PartialDataKey) {
  const aValue = getFieldValue(a, orderBy);
  const bValue = getFieldValue(b, orderBy);

  if (bValue < aValue) {
    return -1;
  }

  if (bValue > aValue) {
    return 1;
  }

  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator(
  order: Order,
  orderBy: PartialDataKey
): (a: Data, b: Data) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort(
  array: readonly Data[],
  comparator: (a: Data, b: Data) => number
) {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [Data, number]
  );
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
      data.score += user.initialScores[score as UUID];
    });
  }

  if (user.numShifts) {
    Object.keys(user.numShifts).forEach((key) => {
      const numShifts = user.numShifts[key as UUID];
      const shiftType = allShiftTypes.find((shiftType) => shiftType.id === key);
      mapNumShifts(data, numShifts, shiftType.score, key as UUID, 'weekday');
    });
  }

  if (user.numWeekendShifts) {
    Object.keys(user.numWeekendShifts).forEach((key) => {
      const numShifts = user.numWeekendShifts[key as UUID];
      const shiftType = allShiftTypes.find((shiftType) => shiftType.id === key);
      mapNumShifts(
        data,
        numShifts,
        shiftType.weekendScore,
        key as UUID,
        'weekend'
      );
    });
  }

  return data;
}

function mapNumShifts(
  data: Data,
  numShifts: NumShifts,
  score: number,
  key: UUID,
  addition: 'weekday' | 'weekend'
): void {
  data.overall += numShifts.normal;
  data.overall += numShifts.home;
  data.score += numShifts.normal * score;
  data.score += numShifts.home * score * 0.5;
  data[`${key as UUID}-${addition}-normal`] += numShifts.normal;
  data[`${key as UUID}-${addition}-home`] += numShifts.home;
}
