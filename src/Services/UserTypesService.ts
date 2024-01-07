import UserType from "../Models/UserType";
import { appStore } from "../Redux/AppState";
import { userTypeActions } from "../Redux/Slices/UserTypeSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class UserTypesService {
  public async getAll(): Promise<UserType[]> {
    let userTypes = appStore.getState().userTypes;

    if (userTypes.length === 0) {
      const response = await server().get<UserType[]>(
        AppConfig.userTypeUrl
      );
      userTypes = response.data;
      appStore.dispatch(userTypeActions.setAll(userTypes));
    }

    return userTypes;
  }

  public async create(
    userTypeToCreate: UserType
  ): Promise<UserType> {
    const response = await server().post<UserType>(
      AppConfig.userTypeUrl + AppConfig.createUrl,
      userTypeToCreate
    );
    const userType = response.data;

    appStore.dispatch(userTypeActions.update(userType));

    return userType;
  }

  public async update(
    userTypeToUpdate: UserType
  ): Promise<UserType> {
    const response = await server().post<UserType>(
      AppConfig.userTypeUrl + AppConfig.updateUrl,
      userTypeToUpdate
    );
    const userType = response.data;

    appStore.dispatch(userTypeActions.update(userType));

    return userType;
  }

  public async delete(
    userTypeIdToDelete: string
  ): Promise<void> {
    // const response = 
    await server().delete<string>(AppConfig.userTypeUrl, {
      params: userTypeIdToDelete,
    });
    // const userType = response.data;

    appStore.dispatch(userTypeActions.remove(userTypeIdToDelete));
  }
}

const userTypesService = new UserTypesService();

export default userTypesService;
