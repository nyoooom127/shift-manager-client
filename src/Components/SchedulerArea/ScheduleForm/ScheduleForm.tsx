import { Controller, useForm } from "react-hook-form";
import Shift from "../../../Models/Shift";
import notification from "../../../Utils/Notification";
import "./ScheduleForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/he";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import weeksService from "../../../Services/WeeksService";

interface ScheduleFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Shift;
  clearShift: () => void;
}

function ScheduleForm(props: ScheduleFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
  } = useForm<Shift>({ mode: "onChange", values: props.initialValues });

  // useEffect(() => {
  //   setValue('startDate', props.initialValues)
  // })
  console.log(props.initialValues);
  // const { field: type } = useController({ control, name: "type" });
  // const { field: user } = useController({ control, name: "user" });
  // const navigate = useNavigate();
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );

  const allUsers = useSelector((appState: AppState) => appState.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    setFilteredUsers(
      allUsers.filter((user) =>
        user.types.some((type) =>
          getValues().type
            ? getValues().type?.allowedUserTypeIds.includes(type.id)
            : true
        )
      )
    );
  }, [allUsers, getValues().type]);

  async function send(shift: Shift) {
    try {
      await weeksService.addShiftToWeek(shift);
      reset();
      props.setOpen(false);
      props.clearShift();
      // notification.success("Welcome Back!");
      // navigate("/home");
    } catch (err: any) {
      notification.error(err);
    }
  }

  function handleCancel() {
    reset();
    props.setOpen(false);
    props.clearShift();
  }

  return (
    <Dialog open={props.open}>
      <div className="ScheduleForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>משמרת</h2>

          <label>StartDate: </label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  adapterLocale="he"
                >
                  <DatePicker {...field} value={moment(field.value)} />
                </LocalizationProvider>
              );
            }}
          />
          {/* <input
          type="date"
          {...register("startDate", Shift.startDateValidation)}
        /> */}
          <span className="err">{formState.errors?.startDate?.message}</span>

          {/* <Select  onChange={type.onChange} ></Select> */}

          <label>Type: </label>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allShiftTypes}
                onChange={(e, value) => {
                  return field.onChange(value);
                }}
                value={field.value}
                //  inputValue={field.value?.name}
                renderOption={(params, option) => (
                  <li {...params}>{option.name}</li>
                )}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            )}
          />

          <label>User: </label>
          <Controller
            name="user"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={filteredUsers}
                onChange={(event, value) => {
                  return field.onChange(value?.id);
                }}
                value={allUsers.find((user) => {
                  return user.id === field.value;
                })}
                //  inputValue={field.value?.name}
                renderOption={(params, option) => (
                  <li {...params}>{option.fullName}</li>
                )}
                getOptionLabel={(option) => option.fullName}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            )}
          />
          {/* <Autocomplete options={}/> */}

          {/* <input type="" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="err">{formState.errors?.password?.message}</span> */}

          <div className="buttons">
            <button>שמור משמרת</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ScheduleForm;
