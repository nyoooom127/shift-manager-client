import { Controller, useForm } from "react-hook-form";
import notification from "../../../../Utils/Notification";
import "./UserTypeForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import { Dialog, TextField } from "@mui/material";
import "moment/locale/he";
import UserType from "../../../../Models/UserType";
import userTypesService from "../../../../Services/UserTypesService";
import { ChromePicker, SketchPicker } from "react-color";

interface UserTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: UserType;
  isNew?: boolean;
}

function UserTypeForm(props: UserTypeFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
    setError,
  } = useForm<UserType>({
    mode: "onChange",
    values: props.initialValues,
  });

  async function send(userType: UserType) {
    try {
      if (props.isNew) {
        await userTypesService.create(userType);
      } else {
        await userTypesService.update(userType);
      }
      reset();
      props.setOpen(false);
    } catch (err: any) {
      notification.error(err);
    }
  }

  function handleCancel() {
    reset();
    props.setOpen(false);
  }

  return (
    <Dialog open={props.open}>
      <div className="UserTypeForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>סוג אילוץ</h2>
          {/* <label>Name: </label>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allUserTypeTypes}
                onChange={(e, value) => {
                  return field.onChange(value);
                }}
                value={field.value}
                renderOption={(params, option) => (
                  <li {...params}>{option.name}</li>
                )}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            )}
          />

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
                  <DateTimePicker {...field} value={moment(field.value)} />
                </LocalizationProvider>
              );
            }}
          />
          <span className="err">{formState.errors?.startDate?.message}</span>

          <label>EndDate: </label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <LocalizationProvider
                  dateAdapter={AdapterMoment}
                  adapterLocale="he"
                >
                  <DateTimePicker {...field} value={moment(field.value)} />
                </LocalizationProvider>
              );
            }}
          />
          <span className="err">{formState.errors?.endDate?.message}</span> */}
          <label>Name:</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} size="small" />}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <SketchPicker
                // <ChromePicker
                color={field.value}
                onChangeComplete={field.onChange}
                disableAlpha
                presetColors={[
                  "#E6A5A4",
                  "#E7B4CC",
                  "#B0E4B8",
                  "#8fc5d7",
                  "#ffb8a3",
                  "#fff6a3",
                  "#E1A3FF"
                ]}
              />
            )}
          />
          <div className="buttons">
            <button>שמור סוג אילוץ</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default UserTypeForm;
