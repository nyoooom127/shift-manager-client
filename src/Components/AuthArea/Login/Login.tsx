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
import StyledForm from "../../SharedArea/StyledForm/StyledForm";

function Login(): JSX.Element {
  const { handleSubmit, control } = useForm<CredentialsModel>();
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
    <StyledForm onSubmit={handleSubmit(send)} className="Login">
      <h2>Login</h2>
      <Controller
        name="username"
        control={control}
        rules={CredentialsModel.usernameValidation}
        render={({ field: { ref, ...field }, fieldState }) => (
          <RtlTextField
            {...field}
            fieldState={fieldState}
            dir="ltr"
            size="small"
            label="שם משתמש"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={CredentialsModel.passwordValidation}
        render={({ field: { ref, ...field }, fieldState }) => (
          <RtlTextField
            {...field}
            fieldState={fieldState}
            dir="ltr"
            size="small"
            label="סיסמא"
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
    </StyledForm>
  );
}

export default Login;
