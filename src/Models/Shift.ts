import { UUID, randomUUID } from "crypto";
import { MomentInput } from "moment";
import { RegisterOptions } from "react-hook-form";
import ShiftType from "./ShiftType";

class Shift {
  id: UUID;
  startDate: MomentInput;
  type: ShiftType;
  user: string;
  week: string;

  constructor(
    startDate: MomentInput,
    type: ShiftType,
    user: string,
    week: string
  ) {
    this.id = randomUUID();
    this.startDate = startDate;
    this.type = type;
    this.user = user;
    this.week = week;
  }

  public static startDateValidation: RegisterOptions<Shift, "startDate"> = {
    required: { value: true, message: "שדה חובה" },
    valueAsDate: true,
  };

  public static typeValidation: RegisterOptions<Shift, "type"> = {
    required: { value: true, message: "שדה חובה" },
  };

  public static userValidation: RegisterOptions<Shift, "user"> = {
    required: { value: true, message: "שדה חובה" },
  };
}

export default Shift;
