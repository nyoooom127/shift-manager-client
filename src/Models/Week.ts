import { MomentInput } from "moment";
import Shift from "./Shift";
import WeekType from "./WeekType";
import { v4 as uuidv4 } from "uuid";

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

}

export default Week;
