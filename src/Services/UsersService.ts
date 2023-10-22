import User from "../Models/User";
import { appStore } from "../Redux/AppState";
import { userActions } from "../Redux/Slices/UserSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class UsersService {
  public async getAllUsers(): Promise<User[]> {
    let users = appStore.getState().users;

    if (users.length === 0) {
      const response = await server.get<User[]>(
        AppConfig.userUrl
      );
      users = response.data;
      appStore.dispatch(userActions.setAll(users));
    }

    return users;
  }

  public async create(user: User): Promise<User[]> {
    let users = appStore.getState().users;

    if (users.length === 0) {
      const response = await server.get<User[]>(
        AppConfig.userUrl
      );
      users = response.data;
      appStore.dispatch(userActions.setAll(users));
    }

    return users;
  }
}

const usersService = new UsersService();

export default usersService;
