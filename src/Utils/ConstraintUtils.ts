import moment, { Moment, MomentInput } from "moment";
import Constraint from "../Models/Constraint";
import { isDateInRange, isWeekend } from "./DateUtils";
import { DayNightField } from "../Components/SharedArea/DayNightPicker/DayNightDatePicker";

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

export function getStartDayNight(startDate: MomentInput): DayNightField {
  const momentStartDate = moment(startDate);

  if (momentStartDate.hour() === 8 && momentStartDate.minute() === 5) {
    return "day";
  }

  if (momentStartDate.hour() === 20 && momentStartDate.minute() === 5) {
    return "night";
  }

  return null;
}

export function getEndDayNight(endDate: MomentInput): DayNightField {
  const momentEndDate = moment(endDate);

  if (momentEndDate.hour() === 19 && momentEndDate.minute() === 55) {
    return "day";
  }

  if (momentEndDate.hour() === 7 && momentEndDate.minute() === 55) {
    return "night";
  }

  return null;
}

export function setStartDayNight(
  startDate: MomentInput,
  startDayNight: DayNightField
): Moment {
  const momentStartDate = moment(startDate);

  if (startDayNight === "day") {
    return momentStartDate.clone().hour(8).minute(5);
  }

  if (startDayNight === "night") {
    return momentStartDate.clone().hour(20).minute(5);
  }

  return momentStartDate;
}

export function setEndDayNight(
  endDate: MomentInput,
  endDayNight: DayNightField
): Moment {
  const momentEndDate = moment(endDate);

  if (endDayNight === "day") {
    return momentEndDate.clone().hour(19).minute(55);
  }

  if (endDayNight === "night") {
    return momentEndDate.clone().hour(7).minute(55).add(1, "d");
  }

  return null;
}
