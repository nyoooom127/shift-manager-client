import { UUID, randomUUID } from "crypto";
import { MomentInput } from "moment";
import { RegisterOptions } from "react-hook-form";
import Shift from "./Shift";
import WeekType from "./WeekType";

class Week {
  id: UUID;
  type: WeekType;
  shifts: Shift[];
  startDate: MomentInput;

  constructor(type: WeekType, startDate: MomentInput) {
    this.id = randomUUID();
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
