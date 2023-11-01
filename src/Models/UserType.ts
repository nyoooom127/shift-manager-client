import { v4 as uuidv4 } from "uuid";
import ShiftType from "./ShiftType";
import { RegisterOptions } from "react-hook-form";

class UserType {
  id: string;
  name: string;
  allowedShiftTypes: ShiftType[];
  autoScheduled: boolean;
  needsSupervision: boolean;
  canSupervise: boolean;
  color: string;

  constructor() {
    this.id = uuidv4();
    this.name = "";
    this.allowedShiftTypes = [];
    this.autoScheduled = false;
    this.needsSupervision = false;
    this.canSupervise = false;
    this.color = "";
  }

  // constructor(
  //   name: string,
  //   allowedShiftTypes: ShiftType[],
  //   autoScheduled: boolean,
  //   needsSupervision: boolean,
  //   canSupervise: boolean,
  //   color: string
  // ) {
  //   this.id = uuidv4();
  //   this.name = name;
  //   this.allowedShiftTypes = allowedShiftTypes;
  //   this.autoScheduled = autoScheduled;
  //   this.needsSupervision = needsSupervision;
  //   this.canSupervise = canSupervise;
  //   this.color = color;
  // }

  public static nameValidation: RegisterOptions<UserType, "name"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "השם צריך להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "השם צריך להיות עד 20 תווים" },
  };

  public static allowedShiftTypesValidation: RegisterOptions<
    UserType,
    "allowedShiftTypes"
  > = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 1, message: "יש לבחור לפחות סוג משמרת אחד" },
  };

  public static colorValidation: RegisterOptions<UserType, "color"> = {
    required: { value: true, message: "שדה חובה" },
    // minLength: { value: 1, message: "Username too short" },
    // maxLength: { value: 30, message: "Username too long" },
    pattern: { value: /^#(?:[0-9a-fA-F]{3}){1,2}$/g, message: "צבע לא תקין" },
  };
}

export default UserType;
