import { MomentInput } from "moment";
import Shift from "./Shift";
import WeekType from "./WeekType";
import { v4 as uuidv4 } from "uuid";
import { RegisterOptions } from "react-hook-form";

class Week {
  id: string;
  type: WeekType;
  shifts: Shift[];
  startDate: MomentInput;

  constructor(type: WeekType, startDate: MomentInput) {
    this.id = uuidv4();
    this.type = type;
    this.shifts = [];
    this.startDate = startDate;
  }

  public static typeValidation: RegisterOptions<Week, "type"> = {
    required: { value: true, message: "שדה חובה" },
  };

  public static startDateValidation: RegisterOptions<Week, "startDate"> = {
    required: { value: true, message: "שדה חובה" },
    valueAsDate: true,
  };
}

export default Week;
