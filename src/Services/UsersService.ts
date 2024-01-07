import User from "../Models/User";
import { appStore } from "../Redux/AppState";
import { userActions } from "../Redux/Slices/UserSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class UsersService {
  public async getAll(): Promise<User[]> {
    let users = appStore.getState().users;

    if (users.length === 0) {
      const response = await server().get<User[]>(
        AppConfig.userUrl
      );
      users = response.data;
      appStore.dispatch(userActions.setAll(users));
    }

    return users;
  }

  public async create(userToCreate: User): Promise<User> {
    const response = await server().post<User>(
      AppConfig.userUrl + AppConfig.createUrl,
      userToCreate
    );
    const user = response.data;

    appStore.dispatch(userActions.update(user));

    return user;
  }

  public async update(userToUpdate: User): Promise<User> {
    const response = await server().post<User>(
      AppConfig.userUrl + AppConfig.updateUrl,
      userToUpdate
    );
    const user = response.data;

    appStore.dispatch(userActions.update(user));

    return user;
  }

  public async delete(
    userIdToDelete: string
  ): Promise<void> {
    // const response = 
    await server().delete<string>(AppConfig.userTypeUrl, {
      params: userIdToDelete,
    });
    // const user = response.data;

    appStore.dispatch(userActions.remove(userIdToDelete));
  }
}

const usersService = new UsersService();

export default usersService;
