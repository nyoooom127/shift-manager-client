import ShiftType from "../Models/ShiftType";
import User from "../Models/User";
import UserPermissionsEnum from "../Models/UserPermissionsEnum";
import UserType from "../Models/UserType";

export function isAdmin(user: User) {
  return user?.authorizationData?.userPermissions === UserPermissionsEnum.ADMIN;
}

export function getOverlappingTypes(
  userTypes: UserType[],
  shiftType: ShiftType
) {
  return userTypes.filter((userType) =>
    shiftType.allowedUserTypeIds.includes(userType.id)
  );
}
