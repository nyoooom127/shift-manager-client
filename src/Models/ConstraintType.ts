import { UUID } from "crypto";
import { RegisterOptions } from "react-hook-form";

class ConstraintType {
  id: UUID;
  name: string;

  constructor(name: string) {
    this.id = new Crypto().randomUUID() as UUID;
    this.name = name;
  }

  public static nameValidation: RegisterOptions<ConstraintType, "name"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "השם צריך להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "השם צריך להיות עד 20 תווים" },
  };
}

export default ConstraintType;
