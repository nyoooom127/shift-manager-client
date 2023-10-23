import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, useForm } from "react-hook-form";
import notification from "../../../Utils/Notification";
import "./UserSettings.css";
// import Select from "react-select/dist/declarations/src/Select";
import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import "moment/locale/he";
import { useState } from "react";
import { useSelector } from "react-redux";
import User from "../../../Models/User";
import UserPermissionsEnum from "../../../Models/UserPermissionsEnum";
import { AppState } from "../../../Redux/AppState";
import usersService from "../../../Services/UsersService";
import { isAdmin } from "../../../Utils/AuthUtils";

interface UserSettingsProps {
  //   open: boolean;
  setOpen?: (value: boolean) => void;
  isNew?: boolean;
  user: User;
  //   initialValues: User;
}

function UserSettings(props: UserSettingsProps): JSX.Element {
  const auth = useSelector((appState: AppState) => appState.auth);
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
  } = useForm<User>({ mode: "onChange", values: props.user });
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
    // <Dialog open={props.open}>
    <div className="UserSettings">
      {props.user && (
        <form onSubmit={handleSubmit(send)}>
          <h2>משתמש</h2>
          <div className="formBody">
            <div className="formColumn">
              {/* <label>Full Name:</label> */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" label="Full Name" />
                )}
              />

              {/* <label>Username:</label> */}
              <Controller
                name="authorizationData.username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Username"
                    inputProps={{
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                )}
              />

              {/* <label>Email:</label> */}
              <Controller
                name="authorizationData.email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" label="Email" inputProps={{
                    form: {
                      autoComplete: "off",
                    },
                  }} />
                )}
              />

              {/* <label>Phone:</label> */}
              <Controller
                name="authorizationData.phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" label="Phone" inputProps={{
                    form: {
                      autoComplete: "off",
                    },
                  }} />
                )}
              />
              <Controller
                name="authorizationData.password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={!isAdmin(auth) && auth.id !== props.user.id}
                    label="Password"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="formColumn">
              {/* <label>Types: </label> */}
              <Controller
                name="types"
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Autocomplete
                    disabled={!isAdmin(auth)}
                    options={allUserTypes}
                    onChange={(e, value) => {
                      return field.onChange(value || []);
                    }}
                    multiple
                    value={field.value}
                    renderOption={(params, option) => (
                      <li {...params}>{option.name}</li>
                    )}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} size="small" label="Types" />
                    )}
                  />
                )}
              />

              {/* <label>Admin: </label> */}
              <Controller
                name="authorizationData.userPermissions"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      labelPlacement="start"
                      label="Admin"
                      control={
                        <Checkbox
                          {...field}
                          disabled={!isAdmin(auth)}
                          checked={field.value === UserPermissionsEnum.ADMIN}
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

              {/* <label>Active: </label> */}
              <Controller
                name="active"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      label="Active"
                      labelPlacement="start"
                      control={
                        <Checkbox
                          disabled={!isAdmin(auth)}
                          {...field}
                          checked={field.value}
                          onChange={(e, checked) => field.onChange(checked)}
                        />
                      }
                    />
                  );
                }}
              />
              {/* <span className="err">{formState.errors?.startDate?.message}</span> */}
              <div className="buttons">
                <button>שמור משתמש</button>
                <button type="button" onClick={handleCancel}>
                  בטל
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
    // </Dialog>
  );
}

export default UserSettings;
