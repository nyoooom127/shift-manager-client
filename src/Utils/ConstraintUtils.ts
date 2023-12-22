import moment, { Moment, MomentInput } from "moment";
import Constraint from "../Models/Constraint";
import { isDateBefore, isDateInRange, isWeekend } from "./DateUtils";

// export function filterConstraintsByMonth(
//   month: Moment,
//   constraints: Constraint[]
// ): Constraint[] {
//   return constraints.filter((constraint) =>
//     isConstraintInMonth(month, constraint)
//   );
// }

export function isConstraintInMonth(
  month: Moment,
  constraint: Constraint
): boolean {
  return isDateInRange(
    month,
    month.clone().endOf("M"),
    constraint.startDate,
    constraint.endDate
  );
}

export function countAllConstraintsDays(constraints: Constraint[]): number {
  return constraints.reduce<number>(
    (days, constraint) => days + countConstraintDays(constraint),
    0
  );
}

export function countConstraintDays(constraint: Constraint): number {
  let numDays = 0;
  let date = moment(constraint.startDate);
  //   const endDate = moment(constraint.endDate);

  while (date.isSameOrBefore(constraint.endDate, "D")) {
    if (isWeekend(date)) {
      numDays += 2;
    } else {
      numDays++;
    }

    date = date.add(1, "d");
  }

  return numDays;
}

export function countAllConstraintsDaysInMonth(
  month: MomentInput,
  constraints: Constraint[]
): number {
  return constraints.reduce<number>(
    (days, constraint) =>
      days + countConstraintDaysInMonth(moment(month), constraint),
    0
  );
}

export function countConstraintDaysInMonth(
  month: Moment,
  constraint: Constraint
): number {
  return countDaysInMonth(month, constraint.startDate, constraint.endDate);
}

export function countDaysInMonth(
  month: MomentInput,
  startDate: MomentInput,
  endDate: MomentInput
): number {
  let numDays = 0;
  let date = moment(startDate);
  //   const endDate = moment(constraint.endDate);

  while (date.isSameOrBefore(endDate, "D") && date.isSame(month, "month")) {
    if (isWeekend(date)) {
      numDays += 2;
    } else {
      numDays++;
    }

    date = date.add(1, "d");
  }

  return numDays;
}
