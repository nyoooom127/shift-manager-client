import { UUID, randomUUID } from "crypto";
import { RegisterOptions } from "react-hook-form";
import ShiftSchedulingLogic from "./ShiftSchedulingLogic.enum";

class ShiftType {
  id: UUID;
  name: string;
  allowedUserTypeIds: UUID[];
  score: number;
  weekendScore: number;
  duration: number;
  startHour: number;
  minBreak: number;
  maxShiftsPerWeek: number;
  hasWeekends: boolean;
  schedulingLogic: ShiftSchedulingLogic;
  displayOrder: number;
  isNeedQualified: boolean;
  isNight: boolean;

  // constructor(
  //   name: string,
  //   allowedUserTypeIds: string[],
  //   duration: number,
  //   startHour: number,
  //   minBreak: number,
  //   hasWeekends: boolean,
  //   schedulingLogic: ShiftSchedulingLogic,
  //   displayOrder: number
  // ) {
  //   this.id = uuidv4();
  //   this.name = name;
  //   this.allowedUserTypeIds = allowedUserTypeIds;
  //   this.duration = duration;
  //   this.startHour = startHour;
  //   this.minBreak = minBreak;
  //   this.hasWeekends = hasWeekends;
  //   this.schedulingLogic = schedulingLogic;
  //   this.displayOrder = displayOrder;
  // }

  constructor() {
    this.id = randomUUID();
    this.name = "";
    this.allowedUserTypeIds = [];
    this.score = 0;
    this.weekendScore = 0;
    this.duration = 0;
    this.startHour = 0;
    this.minBreak = 0;
    this.maxShiftsPerWeek = 0;
    this.hasWeekends = false;
    this.schedulingLogic = ShiftSchedulingLogic.SCORE;
    this.displayOrder = 0;
    this.isNeedQualified = false;
    this.isNight = false;
  }

  public static nameValidation: RegisterOptions<ShiftType, "name"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "השם צריך להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "השם צריך להיות עד 20 תווים" },
  };

  public static allowedUserTypeIdsValidation: RegisterOptions<
    ShiftType,
    "allowedUserTypeIds"
  > = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 1, message: "יש לבחור לפחות סוג משתמש אחד" },
  };

  public static durationValidation: RegisterOptions<ShiftType, "duration"> = {
    required: { value: true, message: "שדה חובה" },
    min: { value: 0, message: "אורך משמרת חייב להיות גדול מ-0" },
  };

  public static startHourValidation: RegisterOptions<ShiftType, "startHour"> = {
    required: { value: true, message: "שדה חובה" },
    min: { value: 0, message: "שעת ההתחלה חייבת להיות בין 0 ל-23" },
    max: { value: 23, message: "שעת ההתחלה חייבת להיות בין 0 ל-23" },
  };

  public static minBreakValidation: RegisterOptions<ShiftType, "minBreak"> = {
    required: { value: true, message: "שדה חובה" },
    min: { value: 0, message: "ימי מנוחה חייב להיות גדול מ-0" },
  };

  public static scoreValidation: RegisterOptions<ShiftType, "score"> = {
    required: { value: true, message: "שדה חובה" },
    validate: (value) => {
      if (value <= 0) {
        return "ניקוד חייב להיות גדול מ-0";
      }
    },
  };

  public static weekendScoreValidation: RegisterOptions<
    ShiftType,
    "weekendScore"
  > = {
    required: { value: true, message: "שדה חובה" },
    validate: (value) => {
      if (value <= 0) {
        return 'ניקוד סופ"ש חייב להיות גדול מ-0';
      }
    },
  };

  public static schedulingLogicValidation: RegisterOptions<
    ShiftType,
    "schedulingLogic"
  > = {
    required: { value: true, message: "שדה חובה" },
  };

  public static maxShiftsPerWeekValidation: RegisterOptions<
    ShiftType,
    "maxShiftsPerWeek"
  > = {
    required: { value: true, message: "שדה חובה" },
    validate: (value, formValues) => {
      const numDays = formValues.hasWeekends ? 7 : 5;
      if (value < 0 || value > numDays) {
        return `מס' משמרות מקסימלי בשבוע חייב להיות בין 0 ל-${numDays}`;
      }
    },
    min: { value: 0, message: "שעת ההתחלה חייבת להיות בין 0 ל-23" },
    max: { value: 23, message: "שעת ההתחלה חייבת להיות בין 0 ל-23" },
  };

  public static displayOrderValidation: RegisterOptions<
    ShiftType,
    "displayOrder"
  > = {
    required: { value: true, message: "שדה חובה" },
    min: { value: 0, message: "סדר לתצוגה חייב להיות גדול מ-0" },
  };
}

export default ShiftType;
