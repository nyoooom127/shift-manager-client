import { useForm } from "react-hook-form";
import notification from "../../../../Utils/Notification";
import "./ConstraintTypeForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import { Dialog, TextField } from "@mui/material";
import "moment/locale/he";
import ConstraintType from "../../../../Models/ConstraintType";
import constraintTypesService from "../../../../Services/ConstraintTypesService";

interface ConstraintTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: ConstraintType;
  isNew?: boolean;
}

function ConstraintTypeForm(props: ConstraintTypeFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
    setError,
  } = useForm<ConstraintType>({
    mode: "onChange",
    values: props.initialValues,
  });

  async function send(constraintType: ConstraintType) {
    try {
      if (props.isNew) {
        await constraintTypesService.create(constraintType);
      } else {
        await constraintTypesService.update(constraintType);
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
      <div className="ConstraintTypeForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>סוג אילוץ</h2>
          {/* <label>Name: </label>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allConstraintTypeTypes}
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
          {/* <label>Name:</label> */}
          <TextField
            {...register("name", ConstraintType.nameValidation)}
            size="small"
            label="Name"
            helperText={formState.errors?.name?.message || ""}
            error={!!formState.errors?.name}
          />
          {/* <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} size="small" />}
          /> */}
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

export default ConstraintTypeForm;
