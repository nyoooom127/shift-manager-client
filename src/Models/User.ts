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

  constructor(
    fullName: string,
    types: UserType[],
    numShifts: Map<string, number>,
    authorizationData: AuthorizationData,
    constraints: Constraint[],
    shifts: Shift[],
    active: boolean
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.types = types;
    this.numShifts = numShifts;
    this.authorizationData = authorizationData;
    this.constraints = constraints;
    this.shifts = shifts;
    this.active = active;
  }
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

  public static emailValidation: RegisterOptions<
    User,
    "authorizationData.email"
  > = {
    required: { value: true, message: "Missing email." },
    pattern: {
      value:
        /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
      message: "Invalid email",
    },
  };

  public static passwordValidation: RegisterOptions<
    User,
    "authorizationData.password"
  > = {
    required: { value: true, message: "Missing password." },
    minLength: { value: 4, message: "Password too short" },
    maxLength: { value: 30, message: "Password too long" },
  };
}

export default User;
