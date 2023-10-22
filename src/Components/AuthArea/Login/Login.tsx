import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import notification from "../../../Utils/Notification";

function Login(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notification.success("Welcome Back!");
            navigate("/home")
        } catch (err: any) {
            notification.error(err);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>

                <label>Username: </label>
                <input type="text" {...register("username", CredentialsModel.usernameValidation)} />
                <span className="err">{formState.errors?.username?.message}</span>

                <label>Password: </label>
                <input type="text" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="err">{formState.errors?.password?.message}</span>

                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
