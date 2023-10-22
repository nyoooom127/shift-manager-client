import { MomentInput } from "moment";
import { RegisterOptions } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ShiftType from "./ShiftType";

class Shift {
  id: string;
  startDate: MomentInput;
  type: ShiftType;
  user: string;

  constructor(startDate: MomentInput, type: ShiftType, user: string) {
    this.id = uuidv4();
    this.startDate = startDate;
    this.type = type;
    this.user = user;
  }

  public static startDateValidation: RegisterOptions<Shift, "startDate"> = {
    required: { value: true, message: "Missing startDate." },
    valueAsDate: true,
    // minLength: { value: 4, message: "Password too short" },
    // maxLength: { value: 30, message: "Password too long" }
  };

  public static shiftTypeValidation: RegisterOptions<Shift, "startDate"> = {
    required: { value: true, message: "Missing type." },
    // minLength: { value: 4, message: "Password too short" },
    // maxLength: { value: 30, message: "Password too long" }
  };

  public static userValidation: RegisterOptions<Shift, "startDate"> = {
    required: { value: true, message: "Missing user." },
    // minLength: { value: 4, message: "Password too short" },
    // maxLength: { value: 30, message: "Password too long" }
  };
}

export default Shift;
