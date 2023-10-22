import ShiftSchedulingLogic from "./ShiftSchedulingLogic.enum";

class ShiftType {
  id: string;
  name: string;
  allowedUserTypeIds: string[];
  duration: number;
  startHour: number;
  minBreak: number;
  hasWeekends: boolean;
  schedulingLogic: ShiftSchedulingLogic;
  displayOrder?: number;

  // constructor(
  //   id: string,
  //   name: string,
  //   allowedUserTypeIds: string[],
  //   duration: number,
  //   startHour: number,
  //   minBreak: number,
  //   hasWeekends: boolean,
  //   schedulingLogic: ShiftSchedulingLogic
  // ) {
  //   this.id = id;
  //   this.name = name;
  //   this.allowedUserTypeIds = allowedUserTypeIds;
  //   this.duration = duration;
  //   this.startHour = startHour;
  //   this.minBreak = minBreak;
  //   this.hasWeekends = hasWeekends;
  //   this.schedulingLogic = schedulingLogic;
  // }
}

export default ShiftType;
