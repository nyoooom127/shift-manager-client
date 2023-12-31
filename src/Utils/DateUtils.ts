import moment, { Moment, MomentInput } from "moment";
import "moment/locale/he";

export function isDateInWeek(
  date: MomentInput,
  weekStart: MomentInput
): boolean {
  const dateMoment = moment(date);
  const weekStartMoment = moment(weekStart).startOf("D");
  const weekEndMoment = weekStartMoment.clone().add(6, "d").endOf("D");

  return (
    dateMoment.isSameOrAfter(weekStartMoment) &&
    dateMoment.isSameOrBefore(weekEndMoment)
  );
}

export function getWeekDays(date: MomentInput): Moment[] {
  return Object.keys([...Array(7)]).map((day) =>
    moment(date).clone().add(day, "d")
  );
}

export function isSameDay(shiftDate: MomentInput, date: MomentInput): boolean {
  const shiftDateMoment = moment(shiftDate);
  const dateMoment = moment(date);

  return shiftDateMoment.isSame(dateMoment, "day");
}

export function isDateBefore(dateA: MomentInput, dateB: MomentInput, granularity: moment.unitOfTime.StartOf = 'ms'): boolean {
  const dateAMoment = moment(dateA);
  const dateBMoment = moment(dateB);

  return dateAMoment.isBefore(dateBMoment, granularity);
}

export function isWeekend(date: MomentInput) {
  const dateMoment = moment(date);
  return dateMoment.day() === 5 || dateMoment.day() === 6;
}

export function getDiff(dateA: MomentInput, dateB: MomentInput): number {
  const dateAMoment = moment(dateA);
  const dateBMoment = moment(dateB);

  return dateAMoment.diff(dateBMoment, "d", true);
}

export function isDateInRange(
  start: MomentInput,
  end: MomentInput,
  startToCheck: MomentInput,
  endToCheck: MomentInput
): boolean {
  const startMoment = moment(start);
  const endMoment = moment(end);
  const startToCheckMoment = moment(startToCheck);
  const endToCheckMoment = moment(endToCheck);

  return !(
    startMoment.isAfter(endToCheckMoment) ||
    endMoment.isBefore(startToCheckMoment)
  );
}
