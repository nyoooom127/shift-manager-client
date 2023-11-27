import { RegisterOptions } from "react-hook-form";
import Constraint from "./Constraint";
import Shift from "./Shift";
import UserPermissionsEnum from "./UserPermissionsEnum";
import UserType from "./UserType";
import { v4 as uuidv4 } from "uuid";

class User {
  id: string;
  fullName: string;
  types: UserType[];
  numShifts: Map<string, number>;
  authorizationData: AuthorizationData;
  constraints: Constraint[];
  shifts: Shift[];
  active: boolean;
  isQualified: boolean;
  avoidNight: boolean;

  constructor(
    fullName: string,
    types: UserType[],
    numShifts: Map<string, number>,
    authorizationData: AuthorizationData,
    constraints: Constraint[],
    shifts: Shift[],
    active: boolean,
    isQualified: boolean,
    avoidNight: boolean
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.types = types;
    this.numShifts = numShifts;
    this.authorizationData = authorizationData;
    this.constraints = constraints;
    this.shifts = shifts;
    this.active = active;
    this.isQualified = isQualified;
    this.avoidNight = avoidNight;
  }

  public static fullNameValidation: RegisterOptions<User, "fullName"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "שם צריך להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "שם צריך להיות עד 20 תווים" },
  };

  public static allowedUserTypeIdsValidation: RegisterOptions<User, "types"> = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 1, message: "יש לבחור לפחות סוג משתמש אחד" },
  };

  public static usernameValidation: RegisterOptions<
    User,
    "authorizationData.username"
  > = {
    required: { value: true, message: "שדה חובה" },
    // minLength: { value: 1, message: "Username too short" },
    // maxLength: { value: 30, message: "Username too long" },
    pattern: {
      value: /^u\d{7}$/g,
      message: 'שם משתמש חייב להיות האות u ואחריה מ"א',
    },
  };

  public static emailValidation: RegisterOptions<
    User,
    "authorizationData.email"
  > = {
    pattern: {
      value:
        /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
      message: "כתובת אימייל לא תקינה",
    },
  };

  public static passwordValidation: RegisterOptions<
    User,
    "authorizationData.password"
  > = {
    required: { value: true, message: "שדה חובה" },
    minLength: { value: 4, message: "סיסמה צריכה להיות לפחות 4 תווים" },
    maxLength: { value: 20, message: "סיסמה צריכה להיות עד 20 תווים" },
  };

  public static phoneValidation: RegisterOptions<
    User,
    "authorizationData.phone"
  > = {
    required: { value: true, message: "שדה חובה" },
    // minLength: { value: 4, message: "סיסמה צריכה להיות לפחות 4 תווים" },
    // maxLength: { value: 20, message: "סיסמה צריכה להיות עד 20 תווים" },
  };
}

export class AuthorizationData {
  userPermissions: UserPermissionsEnum;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;

  // constructor(
  //   userPermissions: UserPermissionsEnum,
  //   username?: string,
  //   password?: string,
  //   email?: string,
  //   phone?: string
  // ) {
  //   this.userPermissions = userPermissions;
  //   this.username = username;
  //   this.password = password;
  //   this.email = email;
  //   this.phone = phone;
  // }
}

export default User;
