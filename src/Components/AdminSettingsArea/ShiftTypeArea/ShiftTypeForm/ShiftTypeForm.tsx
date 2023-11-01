import { Controller, useForm } from "react-hook-form";
import notification from "../../../../Utils/Notification";
import "./ShiftTypeForm.css";
// import Select from "react-select/dist/declarations/src/Select";
import {
  Autocomplete,
  Checkbox,
  Dialog,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import "moment/locale/he";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShiftSchedulingLogic from "../../../../Models/ShiftSchedulingLogic.enum";
import ShiftType from "../../../../Models/ShiftType";
import { AppState } from "../../../../Redux/AppState";
import ShiftTypesService from "../../../../Services/ShiftTypesService";
import {
  getDurationFromShiftTimes,
  getShiftEndTime,
  getShiftStartTime,
} from "../../../../Utils/ShiftUtils";

interface ShiftTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: ShiftType;
  isNew?: boolean;
}

function ShiftTypeForm(props: ShiftTypeFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState,
    getValues,
    setValue,
    reset,
    setError,
  } = useForm<ShiftType>({
    mode: "onChange",
    values: props.initialValues,
  });

  console.log(
    Object.keys(ShiftSchedulingLogic).filter((item) => {
      return isNaN(Number(item));
    })
  );
  const allUserTypes = useSelector((appState: AppState) => appState.userTypes);
  const [startHour, setStartHour] = useState<Moment>(
    getShiftStartTime(props.initialValues?.startHour)
  );
  const [endHour, setEndHour] = useState<Moment>(
    getShiftEndTime(
      props.initialValues?.startHour,
      props.initialValues?.duration
    )
  );

  useEffect(() => {
    setStartHour(getShiftStartTime(props.initialValues?.startHour));
    setEndHour(
      getShiftEndTime(
        props.initialValues?.startHour,
        props.initialValues?.duration
      )
    );
  }, [props.initialValues?.startHour, props.initialValues?.duration]);

  useEffect(() => {
    setValue("startHour", startHour.hour());
  }, [startHour, setValue]);

  useEffect(() => {
    setValue("duration", getDurationFromShiftTimes(startHour, endHour));
  }, [startHour, endHour, setValue]);

  async function send(ShiftType: ShiftType) {
    try {
      if (props.isNew) {
        await ShiftTypesService.create(ShiftType);
      } else {
        await ShiftTypesService.update(ShiftType);
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
      <div className="ShiftTypeForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>סוג משמרת</h2>
          {/* <label>Name:</label> */}
          <TextField
            {...register("name", ShiftType.nameValidation)}
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
          <label>Allowed User Types: </label>
          <Controller
            name="allowedUserTypeIds"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Autocomplete
                options={allUserTypes}
                onChange={(e, value) => {
                  return field.onChange(value.map((v) => v.id));
                }}
                multiple
                value={field.value.map((v) =>
                  allUserTypes.find((userType) => userType.id === v)
                )}
                renderOption={(params, option) => (
                  <li key={option.id} {...params}>
                    {option.name}
                  </li>
                )}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            )}
          />
          {/* <Autocomplete
          {...register("allowedUserTypeIds", ShiftType.allowedUserTypeIdsValidation)}
            options={allUserTypes}
            onChange={(e, value) => {
              return {...register("allowedUserTypeIds", ShiftType.allowedUserTypeIdsValidation)}.onChange(value.map((v) => v.id));
            }}
            multiple
            value={{...register("allowedUserTypeIds", ShiftType.allowedUserTypeIdsValidation)}.value.map((v) =>
              allUserTypes.find((userType) => userType.id === v)
            )}
            renderOption={(params, option) => (
              <li key={option.id} {...params}>
                {option.name}
              </li>
            )}
            getOptionLabel={(option) => {
              return option.name;
            }}
            renderInput={(params) => <TextField {...params} size="small" label="Allowed User Types" />}
          />
          <TextField
            {...register("name", ShiftType.nameValidation)}
            size="small"
            label="Allowed User Types"
            helperText={formState.errors?.name?.message || ""}
            error={!!formState.errors?.name}
          /> */}

          <div style={{ display: "flex" }}>
            <label>Start Hour: </label>
            <Controller
              name="startHour"
              control={control}
              render={({ field }) => {
                return (
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale="he"
                  >
                    <TimePicker
                      {...field}
                      value={startHour}
                      onChange={(time) => setStartHour(time)}
                    />
                  </LocalizationProvider>
                );
              }}
            />
            {/* <span className="err">{formState.errors?.startDate?.message}</span> */}
            <label>End Hour: </label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => {
                console.log(field);
                return (
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale="he"
                  >
                    <TimePicker
                      {...field}
                      value={endHour}
                      onChange={(time) => setEndHour(time)}
                    />
                  </LocalizationProvider>
                );
              }}
            />
          </div>

          <div>Duration: {getValues().duration} hours</div>
          <label>Min Break:</label>
          <Controller
            name="minBreak"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" type="number" />
            )}
          />
          <Controller
            name="hasWeekends"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  labelPlacement="start"
                  label="Has Weekends"
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e, checked) => field.onChange(checked)}
                    />
                  }
                />
              );
            }}
          />
          <label>Scheduling Logic: </label>
          <Controller
            name="schedulingLogic"
            control={control}
            render={({ field, fieldState, formState }) => (
              <Select
                value={field.value}
                // options=
                onChange={(e) => {
                  return field.onChange(e.target.value);
                }}
                // multiple
                // value={field.value.map((v) =>
                //   allUserTypes.find((userType) => userType.id === v)
                // )}
                // renderOption={(params, option) => (
                //   <li {...params}>{option.name}</li>
                // )}
                // getOptionLabel={(option) => option.name}
                // renderInput={(params) => <TextField {...params} size="small" />}
              >
                {Object.keys(ShiftSchedulingLogic)
                  .filter((item) => {
                    return isNaN(Number(item));
                  })
                  .map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          <label>Display Order:</label>
          <Controller
            name="displayOrder"
            control={control}
            render={({ field }) => (
              <TextField {...field} size="small" type="number" />
            )}
          />
          {/* <span className="err">{formState.errors?.endDate?.message}</span> */}
          <div className="buttons">
            <button>שמור</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ShiftTypeForm;
