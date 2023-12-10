import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notification from "../../../Utils/Notification";
import HideableRtlTextField from "../../SharedArea/HideableRtlTextField/HideableRtlTextField";
import RtlTextField from "../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../SharedArea/StyledForm/StyledForm";

function Login(): JSX.Element {
  const { handleSubmit, control } = useForm<CredentialsModel>();
  const navigate = useNavigate();

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
    <StyledForm onSubmit={handleSubmit(send)} login>
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
          <HideableRtlTextField
            {...field}
            fieldState={fieldState}
            label="סיסמא"
          />
        )}
      />
      <button>Login</button>
    </StyledForm>
  );
}

export default Login;
