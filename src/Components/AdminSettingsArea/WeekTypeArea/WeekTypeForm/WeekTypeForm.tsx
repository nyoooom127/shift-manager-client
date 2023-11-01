import { Controller, useForm } from "react-hook-form";
import notification from "../../../../Utils/Notification";
import "./WeekTypeForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import { Dialog, TextField } from "@mui/material";
import "moment/locale/he";
import WeekType from "../../../../Models/WeekType";
import weekTypesService from "../../../../Services/WeekTypesService";

interface WeekTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: WeekType;
  isNew?: boolean;
}

function WeekTypeForm(props: WeekTypeFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
    setError,
  } = useForm<WeekType>({
    mode: "onChange",
    values: props.initialValues,
  });

  async function send(weekType: WeekType) {
    try {
      if (props.isNew) {
        await weekTypesService.create(weekType);
      } else {
        await weekTypesService.update(weekType);
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
      <div className="WeekTypeForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>סוג אילוץ</h2>
          {/* <label>Name: </label>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allWeekTypeTypes}
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

export default WeekTypeForm;
