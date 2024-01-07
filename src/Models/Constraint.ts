import { MomentInput } from "moment";
import { RegisterOptions } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ConstraintFormFields } from "../Components/UserArea/ConstraintArea/ConstraintForm/ConstraintForm";
import { isDateBefore } from "../Utils/DateUtils";
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

  public static typeValidation: RegisterOptions<ConstraintFormFields, "type"> =
    {
      required: { value: true, message: "שדה חובה" },
    };

  public static startDateValidation: RegisterOptions<
    ConstraintFormFields,
    "startDate"
  > = {
    required: { value: true, message: "שדה חובה" },
    valueAsDate: true,
    validate: (value, formValues) => {
      if (isDateBefore(formValues.endDate, value)) {
        return "תאריך הסיום צריך להיות אחרי תאריך ההתחלה";
      }

      // if (
      //   (countDaysInMonth(
      //     value,
      //     value,
      //     formValues.endDate
      //   ) +
      //     countAllConstraintsDaysInMonth(
      //       value,
      //       formValues.constraints
      //     ) >
      //   AppConfig.maxMonthlyConstraints)
      //   || (countDaysInMonth(
      //     formValues.endDate,
      //     value,
      //     formValues.endDate
      //   ) +
      //     countAllConstraintsDaysInMonth(
      //       formValues.endDate,
      //       formValues.constraints
      //     ) >
      //   AppConfig.maxMonthlyConstraints)
      // ) {
      //   return `לא ניתן להזין יותר מ-${AppConfig.maxMonthlyConstraints} אילוצים בחודש`
      // }
    },
  };

  public static endDateValidation: RegisterOptions<
    ConstraintFormFields,
    "endDate"
  > = {
    required: { value: true, message: "שדה חובה" },
    valueAsDate: true,
    validate: (value, formValues) => {
      if (isDateBefore(value, formValues.startDate)) {
        return "תאריך הסיום צריך להיות אחרי תאריך ההתחלה";
      }

      // if (
      //   (countDaysInMonth(
      //     formValues.startDate,
      //     formValues.startDate,
      //     value
      //   ) +
      //     countAllConstraintsDaysInMonth(
      //       formValues.startDate,
      //       formValues.constraints
      //     ) >
      //   AppConfig.maxMonthlyConstraints)
      //   || (countDaysInMonth(
      //     value,
      //     formValues.startDate,
      //     value
      //   ) +
      //     countAllConstraintsDaysInMonth(
      //       value,
      //       formValues.constraints
      //     ) >
      //   AppConfig.maxMonthlyConstraints)
      // ) {
      //   return `לא ניתן להזין יותר מ-${AppConfig.maxMonthlyConstraints} אילוצים בחודש`
      // }
    },
  };

  public static commentValidation: RegisterOptions<
    ConstraintFormFields,
    "comment"
  > = {
    // minLength: { value: 4, message: "ההערה צריכה להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "ההערה צריכה להיות עד 20 תווים" },
  };
}

export default Constraint;
