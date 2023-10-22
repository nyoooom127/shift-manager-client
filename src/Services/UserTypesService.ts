import UserType from "../Models/UserType";
import { appStore } from "../Redux/AppState";
import { userTypeActions } from "../Redux/Slices/UserTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class UserTypesService {
  public async getAllUserTypes(): Promise<UserType[]> {
    let userTypes = appStore.getState().userTypes;

    if (userTypes.length === 0) {
      const response = await server.get<UserType[]>(
        AppConfig.userTypeUrl
      );
      userTypes = response.data;
      appStore.dispatch(userTypeActions.setAll(userTypes));
    }

    return userTypes;
  }
}

const userTypesService = new UserTypesService();

export default userTypesService;
