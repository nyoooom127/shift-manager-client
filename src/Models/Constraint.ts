import { MomentInput } from "moment";
import { v4 as uuidv4 } from "uuid";
import ConstraintType from "./ConstraintType";

class Constraint {
  id: string;
  type: ConstraintType;
  startDate: MomentInput;
  endDate: MomentInput;
  user: string;
  comment?: string;

  constructor(
    // id: string,
    type: ConstraintType,
    startDate: MomentInput,
    endDate: MomentInput,
    user: string,
    comment?: string
  ) {
    this.id = uuidv4();
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.user = user;
    this.comment = comment;
  }
}

export default Constraint;
