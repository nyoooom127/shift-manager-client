import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import "moment/locale/he";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";
import User from "../../../Models/User";
import UserPermissionsEnum from "../../../Models/UserPermissionsEnum";
import { AppState } from "../../../Redux/AppState";
import usersService from "../../../Services/UsersService";
import notification from "../../../Utils/Notification";
import { isAdmin } from "../../../Utils/UserUtils";
import RtlAutocomplete from "../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlTextField from "../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../SharedArea/StyledForm/StyledForm";

interface UserSettingsProps {
  setOpen?: (value: boolean) => void;
  isNew?: boolean;
  user: User;
}

function UserSettings(props: UserSettingsProps): JSX.Element {
  const auth = useSelector((appState: AppState) => appState.auth);
  const { handleSubmit, control, reset } = useForm<User>({
    mode: "onChange",
    values: props.user,
  });
  const allUserTypes = useSelector((appState: AppState) => appState.userTypes);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  async function send(user: User) {
    try {
      if (props.isNew) {
        await usersService.create(user);
      } else {
        await usersService.update(user);
      }
      reset();
      props.setOpen && props.setOpen(false);
    } catch (err: any) {
      notification.error(err);
    }
  }

  function handleCancel() {
    reset();
    props.setOpen && props.setOpen(false);
  }

  return (
    <>
      {props.user && (
        <StyledForm onSubmit={handleSubmit(send)} className="UserSettings">
          <h2>משתמש</h2>
          <div className="FormBody">
            <div className="FormColumn">
              <Controller
                name="fullName"
                control={control}
                rules={User.fullNameValidation}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <RtlTextField
                    {...field}
                    disabled={!isAdmin(auth) && auth.id !== props.user.id}
                    fieldState={fieldState}
                    size="small"
                    label="שם מלא"
                    fullWidth={false}
                  />
                )}
              />
              <Controller
                name="authorizationData.username"
                control={control}
                rules={User.usernameValidation}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <RtlTextField
                    {...field}
                    fieldState={fieldState}
                    disabled={!isAdmin(auth) && auth.id !== props.user.id}
                    size="small"
                    fullWidth={false}
                    dir="ltr"
                    label="שם משתמש"
                    inputProps={{
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="authorizationData.email"
                control={control}
                // rules={User.emailValidation}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <RtlTextField
                    {...field}
                    fieldState={fieldState}
                    disabled={!isAdmin(auth) && auth.id !== props.user.id}
                    size="small"
                    fullWidth={false}
                    label="אימייל"
                    dir="ltr"
                    inputProps={{
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="authorizationData.phone"
                control={control}
                // rules={User.phoneValidation}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <InputMask
                    mask="099-999-9999"
                    {...field}
                    maskChar=" "
                    disabled={!isAdmin(auth) && auth.id !== props.user.id}
                  >
                    <RtlTextField
                      fieldState={fieldState}
                      size="small"
                      fullWidth={false}
                      label="טלפון"
                      dir="ltr"
                      inputProps={{
                        form: {
                          autoComplete: "off",
                        },
                      }}
                    />
                  </InputMask>
                )}
              />
              <Controller
                name="authorizationData.password"
                control={control}
                rules={User.passwordValidation}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <RtlTextField
                    {...field}
                    fieldState={fieldState}
                    disabled={!isAdmin(auth) && auth.id !== props.user.id}
                    label="סיסמא"
                    size="small"
                    fullWidth={false}
                    dir="ltr"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
            </div>
            {isAdmin(auth) && (
              <>
                <Divider orientation="vertical" flexItem />
                <div className="FormColumn">
                  <Controller
                    name="types"
                    control={control}
                    render={({ field: { ref, ...field }, fieldState }) => (
                      <RtlAutocomplete
                        {...field}
                        fieldState={fieldState}
                        disabled={!isAdmin(auth)}
                        options={allUserTypes}
                        onChange={(value) => {
                          return field.onChange(value || []);
                        }}
                        fullWidth={false}
                        multiple
                        labelKey={"name"}
                        label="סוגים"
                        value={field.value}
                      />
                    )}
                  />

                  <div className="CheckBoxWrapper">
                    <Controller
                      name="authorizationData.userPermissions"
                      control={control}
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <FormControlLabel
                            labelPlacement="end"
                            label="אדמין"
                            control={
                              <Checkbox
                                {...field}
                                disabled={!isAdmin(auth)}
                                checked={
                                  field.value === UserPermissionsEnum.ADMIN
                                }
                                onChange={(e, checked) =>
                                  field.onChange(
                                    checked
                                      ? UserPermissionsEnum.ADMIN
                                      : UserPermissionsEnum.USER
                                  )
                                }
                              />
                            }
                          />
                        );
                      }}
                    />
                    <Controller
                      name="active"
                      control={control}
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <FormControlLabel
                            label="פעיל"
                            labelPlacement="end"
                            control={
                              <Checkbox
                                disabled={!isAdmin(auth)}
                                {...field}
                                checked={field.value}
                                onChange={(e, checked) =>
                                  field.onChange(checked)
                                }
                              />
                            }
                          />
                        );
                      }}
                    />
                    <Controller
                      name="isQualified"
                      control={control}
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <FormControlLabel
                            label="ראשי"
                            labelPlacement="end"
                            control={
                              <Checkbox
                                disabled={!isAdmin(auth)}
                                {...field}
                                checked={field.value}
                                onChange={(e, checked) =>
                                  field.onChange(checked)
                                }
                              />
                            }
                          />
                        );
                      }}
                    />
                    <Controller
                      name="avoidNight"
                      control={control}
                      render={({ field: { ref, ...field } }) => {
                        return (
                          <FormControlLabel
                            label="המנע מלילה"
                            labelPlacement="end"
                            control={
                              <Checkbox
                                disabled={!isAdmin(auth)}
                                {...field}
                                checked={field.value}
                                onChange={(e, checked) =>
                                  field.onChange(checked)
                                }
                              />
                            }
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="Buttons">
            <button>שמור משתמש</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </StyledForm>
      )}
    </>
  );
}

export default UserSettings;
