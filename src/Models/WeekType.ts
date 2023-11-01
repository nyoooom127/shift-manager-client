import { v4 as uuidv4 } from "uuid";
import ShiftType from "./ShiftType";
import { RegisterOptions } from "react-hook-form";

class WeekType {
  id: string;
  name: string;
  requiredShifts: ShiftType[];

  constructor() {
    this.id = uuidv4();
    this.name = "";
    this.requiredShifts = [];
  }

  // constructor(name: string, requiredShifts: ShiftType[]) {
  //   this.id = uuidv4();
  //   this.name = name;
  //   this.requiredShifts = requiredShifts;
  // }

  public static nameValidation: RegisterOptions<WeekType, "name"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "השם צריך להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "השם צריך להיות עד 20 תווים" },
  };

  public static allowedUserTypeIdsValidation: RegisterOptions<
    WeekType,
    "requiredShifts"
  > = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 1, message: "יש לבחור לפחות סוג משתמש אחד" },
  };
}

export default WeekType;
