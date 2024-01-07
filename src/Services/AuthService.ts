import jwtDecode from "jwt-decode";
import CredentialsModel from "../Models/CredentialsModel";
import User from "../Models/User";
import { appStore } from "../Redux/AppState";
import { authActions } from "../Redux/Slices/AuthSlice";
import AppConfig from "../Utils/AppConfig";
import server from "../Utils/Axios";

class AuthService {
  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await server().post<string>(
      AppConfig.userUrl + AppConfig.loginUrl,
      credentials
    );
    const token = response.data;
    localStorage.setItem("token", token);
    const registeredUser = jwtDecode<{ user: User }>(token).user;
    appStore.dispatch(authActions.register(registeredUser));
  }

  public async logout(): Promise<void> {
    appStore.dispatch(authActions.logout());
    localStorage.removeItem("token");
  }

  public loadToken(): void {
    const token = localStorage.getItem("token");

    if (token) {
      const loggedInUser = jwtDecode<{ user: string }>(token).user;
      appStore.dispatch(authActions.login(JSON.parse(loggedInUser)));
    }
  }
}

const authService = new AuthService();
authService.loadToken();

export default authService;
