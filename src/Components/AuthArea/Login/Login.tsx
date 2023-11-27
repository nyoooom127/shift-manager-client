import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notification from "../../../Utils/Notification";
import RtlTextField from "../../SharedArea/RtlTextField/RtlTextField";
import "./Login.css";

function Login(): JSX.Element {
  const { handleSubmit, formState, control } =
    useForm<CredentialsModel>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notification.success("Welcome Back!");
      navigate("/home");
    } catch (err: any) {
      notification.error(err);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>
        <Controller
          name="username"
          control={control}
          rules={CredentialsModel.usernameValidation}
          render={({ field }) => (
            <RtlTextField
              {...field}
              dir="ltr"
              size="small"
              label="שם משתמש"
              helperText={formState.errors?.username?.message || ""}
              error={!!formState.errors?.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={CredentialsModel.passwordValidation}
          render={({ field }) => (
            <RtlTextField
              {...field}
              dir="ltr"
              size="small"
              label="סיסמא"
              helperText={formState.errors?.username?.message || ""}
              error={!!formState.errors?.password?.message}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
