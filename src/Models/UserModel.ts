import AuthorizationDataModel from "./AuthorizationDataModel";
import ConstraintModel from "./ConstraintModel";
import ShiftTypeModel from "./ShiftTypeModel";
import UserPermissionsEnum from "./UserPermissionsEnum";

class UserModel {
  public id: string;
  public fullName: string;
  public ojtScore: number | null;
  public levScore: number | null;
  public integrationScore: number | null;
  public galaxyScore: number | null;
  public constraints: ConstraintModel[];
  public shiftOptions: ShiftTypeModel[];
  public userPermissions?: UserPermissionsEnum[];
  public authorizationData: AuthorizationDataModel | null;
}

export default UserModel;
