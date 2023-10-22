import { Controller, useForm } from "react-hook-form";
import { isDateBefore } from "../../../../Utils/DateUtils";
import notification from "../../../../Utils/Notification";
import "./ConstraintForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import "moment/locale/he";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Constraint from "../../../../Models/Constraint";
import { AppState } from "../../../../Redux/AppState";
import constraintsService from "../../../../Services/ConstraintsService";

interface ConstraintFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Constraint;
}

function ConstraintForm(props: ConstraintFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
    setError,
  } = useForm<Constraint>({ mode: "onChange", values: props.initialValues });
  const allConstraintTypes = useSelector(
    (appState: AppState) => appState.constraintTypes
  );

  async function send(constraint: Constraint) {
    try {
      await constraintsService.create(constraint);
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

  useEffect(() => {
    if (isDateBefore(getValues().endDate, getValues().startDate)) {
      setError("endDate", { message: "זמן סיום צריך להיות אחרי זמן התחלה" });
    }
  }, [getValues().startDate, getValues().endDate]);

  return (
    <Dialog open={props.open}>
      <div className="ConstraintForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>אילוץ</h2>

          <label>Type: </label>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allConstraintTypes}
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
          <span className="err">{formState.errors?.endDate?.message}</span>
          <label>Comment:</label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => <TextField {...field} size="small" />}
          />
          <div className="buttons">
            <button>שמור אילוץ</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ConstraintForm;
