import { Controller, useForm } from "react-hook-form";
import notification from "../../../Utils/Notification";
import "./WeekForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/he";
import { useSelector } from "react-redux";
import Week from "../../../Models/Week";
import { AppState } from "../../../Redux/AppState";
import weeksService from "../../../Services/WeeksService";

interface WeekFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Week;
}

function WeekForm(props: WeekFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
  } = useForm<Week>({ mode: "onChange", values: props.initialValues });
  const allWeekTypes = useSelector((appState: AppState) => appState.weekTypes);

  async function send(week: Week) {
    try {
      await weeksService.create(week);
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
      <div className="WeekForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>שבוע</h2>

          <label>Type: </label>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allWeekTypes}
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
                  <DatePicker {...field} value={moment(field.value)} />
                </LocalizationProvider>
              );
            }}
          />
          <span className="err">{formState.errors?.startDate?.message}</span>
          <div className="buttons">
            <button>שמור שבוע</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default WeekForm;
