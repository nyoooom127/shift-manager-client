import { RegisterOptions } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

class ConstraintType {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }

  public static nameValidation: RegisterOptions<ConstraintType, "name"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "השם צריך להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "השם צריך להיות עד 20 תווים" },
  };
}

export default ConstraintType;
