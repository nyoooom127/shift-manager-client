import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notification from "../../../Utils/Notification";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit, formState, control } =
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

        {/* <label>Username: </label> */}
        {/* <Controller
        name="username"
        control={control}
        render={({field}) => (
            <TextField {...field} size="small" label='Username'/>
        )}
        /> */}
        <TextField
          {...register("username", CredentialsModel.usernameValidation)}
          size="small"
          label="Username"
          helperText={formState.errors?.username?.message || ""}
          error={!!formState.errors?.username}
        />

        {/* <input
          type="text"
          {...register("username", CredentialsModel.usernameValidation)}
        /> */}
        {/* <span className="err">{formState.errors?.username?.message}</span> */}

        {/* <label>Password: </label> */}
        {/* <Controller
          name="password"
          control={control}
          render={({ field }) => ( */}
        <TextField
          {...register("password", CredentialsModel.passwordValidation)}
          helperText={formState.errors?.password?.message || ""}
          error={!!formState.errors?.password}
          // disabled={!isAdmin(auth) && auth.id !== user.id}
          label="Password"
          size="small"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          InputProps={{
            // <-- This is where the toggle button is added.
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

        {/* )}
        /> */}
        {/* <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              // disabled={!isAdmin(auth) && auth.id !== user.id}
              label="Password"
              size="small"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                // <-- This is where the toggle button is added.
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
        /> */}
        {/* <input
          type="text"
          {...register("password", CredentialsModel.passwordValidation)}
        /> */}
        {/* <span className="err">{formState.errors?.password?.message}</span> */}

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
