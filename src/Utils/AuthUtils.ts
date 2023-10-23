import User from "../Models/User";
import UserPermissionsEnum from "../Models/UserPermissionsEnum";

export function isAdmin(user: User) {
    return user?.authorizationData?.userPermissions === UserPermissionsEnum.ADMIN;
}