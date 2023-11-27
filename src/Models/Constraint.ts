import { MomentInput } from "moment";
import { RegisterOptions } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ConstraintType from "./ConstraintType";
import { isDateBefore } from "../Utils/DateUtils";

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

  public static typeValidation: RegisterOptions<Constraint, "type"> = {
    required: { value: true, message: "שדה חובה" },
  };

  public static startDateValidation: RegisterOptions<Constraint, "startDate"> =
    {
      required: { value: true, message: "שדה חובה" },
      valueAsDate: true,
      validate: (value, formValues) => {
        if (isDateBefore(formValues.endDate, value)) {
          return "תאריך הסיום צריך להיות אחרי תאריך ההתחלה";
        }
      },
    };

  public static endDateValidation: RegisterOptions<Constraint, "endDate"> = {
    required: { value: true, message: "שדה חובה" },
    valueAsDate: true,
    validate: (value, formValues) => {
      if (isDateBefore(value, formValues.startDate)) {
        return "תאריך הסיום צריך להיות אחרי תאריך ההתחלה";
      }
    },
  };

  public static commentValidation: RegisterOptions<Constraint, "comment"> = {
    // minLength: { value: 4, message: "ההערה צריכה להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "ההערה צריכה להיות עד 20 תווים" },
  };
}

export default Constraint;
