import moment, { Moment, MomentInput } from "moment";
import Shift from "../Models/Shift";

// export function getShiftStartTime(shift: Shift) {}

export function getShiftStartTime(
  startHour: number = 0,
  date?: MomentInput
): Moment {
    return moment(date).startOf('D').hour(startHour);
}

export function getShiftEndTime(
  startHour: number = 0,
  duration: number = 0,
  date?: MomentInput
): Moment {
    return getShiftStartTime(startHour, date).add(duration, 'hour');
}

export function getDurationFromShiftTimes(startHour: Moment, endHour: Moment) {
    return endHour.diff(startHour, "hour", true);
}
