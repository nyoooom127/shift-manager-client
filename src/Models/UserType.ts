import ShiftType from "./ShiftType";

class UserType {
  id: string;
  name: string;
  allowedShiftTypes: ShiftType[];
  autoScheduled: boolean;
  needsSupervision: boolean;
  canSupervise: boolean;
  color: string;

//   constructor(
//     id: string,
//     name: string,
//     allowedShiftTypes: ShiftType[],
//     autoScheduled: boolean,
//     needsSupervision: boolean,
//     canSupervise: boolean
//   ) {
//     this.id = id;
//     this.name = name;
//     this.allowedShiftTypes = allowedShiftTypes;
//     this.autoScheduled = autoScheduled;
//     this.needsSupervision = needsSupervision;
//     this.canSupervise = canSupervise;
//   }
}

export default UserType;
