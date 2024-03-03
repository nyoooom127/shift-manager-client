import moment, { Moment, MomentInput } from 'moment';
import Shift from '../Models/Shift';
import ShiftType from '../Models/ShiftType';
import { getDiff, isWeekend } from './DateUtils';

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
  return Math.abs(endHour.diff(startHour, 'hour', true));
}

export function isShiftTooClose(shift: Shift, shiftsToCheck: Shift[]) {
  return shiftsToCheck.some((shiftToCheck) => {
    if (shift.id === shiftToCheck.id) {
      return false;
    }

    const diff = Math.abs(getDiff(shift.startDate, shiftToCheck.startDate));

    return diff < shift.type.minBreak || diff < shiftToCheck.type.minBreak;
  });
}

export function isTwoWeekendsInARow(
  shift: Shift,
  shiftsToCheck: Shift[]
): boolean {
  return (
    isWeekend(shift.startDate) &&
    shiftsToCheck.some((shiftToCheck) => {
      if (shift.id === shiftToCheck.id || !isWeekend(shiftToCheck.startDate)) {
        return false;
      }

      const diff = Math.abs(getDiff(shift.startDate, shiftToCheck.startDate));

      return diff >= 6 && diff <= 8;
    })
  );
}

export function calcIsFromHome(
  shiftDate: MomentInput,
  shiftType: ShiftType
): boolean {
  return shiftType.hasWeekends && isWeekend(shiftDate)
    ? shiftType.isDefaultWeekendFromHome
    : shiftType.isDefaultWeekdayFromHome;
}
