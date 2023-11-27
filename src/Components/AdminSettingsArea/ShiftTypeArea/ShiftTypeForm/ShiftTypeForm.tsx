import { Controller, useForm } from "react-hook-form";
import notification from "../../../../Utils/Notification";
import "./ShiftTypeForm.css";
import { Checkbox, Dialog, FormControlLabel, MenuItem } from "@mui/material";
import moment, { Moment, MomentInput } from "moment";
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
import RtlAutocomplete from "../../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlTimePickerField from "../../../SharedArea/RtlTimePickerField/RtlTimePickerField";
import RtlSelect from "../../../SharedArea/RtlSelect/RtlSelect";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";

interface ShiftTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: ShiftType;
  isNew?: boolean;
}

function ShiftTypeForm(props: ShiftTypeFormProps): JSX.Element {
  const { handleSubmit, control, getValues, setValue, reset } =
    useForm<ShiftType>({
      mode: "onChange",
      values: props.initialValues,
    });

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
          <Controller
            name="name"
            control={control}
            rules={ShiftType.nameValidation}
            render={({ field, fieldState }) => (
              <RtlTextField
                {...field}
                fieldState={fieldState}
                size="small"
                label="שם"
              />
            )}
          />
          <Controller
            name="allowedUserTypeIds"
            control={control}
            rules={ShiftType.allowedUserTypeIdsValidation}
            render={({ field, fieldState, formState }) => (
              <RtlAutocomplete
                options={allUserTypes}
                onChange={(value) => {
                  return field.onChange(value.map((v) => v.id));
                }}
                multiple
                value={field.value.map((v) =>
                  allUserTypes.find((userType) => userType.id === v)
                )}
                labelKey={"name"}
                label="סוגי משתמשים"
              />
            )}
          />
          <div className="FormRow">
            <Controller
              name="startHour"
              control={control}
              rules={ShiftType.startHourValidation}
              render={({ field, fieldState }) => {
                return (
                  <RtlTimePickerField
                    {...field}
                    fieldState={fieldState}
                    value={startHour}
                    onChange={(time: MomentInput) => setStartHour(moment(time))}
                    label={"זמן התחלה"}
                  />
                );
              }}
            />
            <Controller
              name="duration"
              control={control}
              rules={ShiftType.durationValidation}
              render={({ field, fieldState }) => {
                return (
                  <RtlTimePickerField
                    {...field}
                    fieldState={fieldState}
                    value={endHour}
                    onChange={(time: MomentInput) => setEndHour(moment(time))}
                    label={"זמן סיום"}
                  />
                );
              }}
            />
          </div>

          <div>משך: {getValues().duration} שעות</div>
          <div className="FormRow">
            <Controller
              name="minBreak"
              control={control}
              rules={ShiftType.minBreakValidation}
              render={({ field, fieldState }) => (
                <RtlTextField
                  {...field}
                  fieldState={fieldState}
                  label="מרווח מינימום"
                  size="small"
                  type="number"
                />
              )}
            />
            <Controller
              name="displayOrder"
              control={control}
              render={({ field, fieldState }) => (
                <RtlTextField
                  {...field}
                  fieldState={fieldState}
                  label="סדר לתצוגה"
                  size="small"
                  type="number"
                />
              )}
            />
          </div>
          <Controller
            name="hasWeekends"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  labelPlacement="end"
                  label='כולל סופ"ש'
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
          <Controller
            name="schedulingLogic"
            control={control}
            render={({ field, fieldState, formState }) => (
              <RtlSelect
                dir="rtl"
                label="שיטת שיבוץ"
                error={!!fieldState.error}
                required
                size="small"
                value={field.value}
                onChange={(e) => {
                  return field.onChange(e.target.value);
                }}
              >
                {Object.keys(ShiftSchedulingLogic)
                  .filter((item) => {
                    return isNaN(Number(item));
                  })
                  .map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {
                        ShiftSchedulingLogic[
                          option as keyof typeof ShiftSchedulingLogic
                        ]
                      }
                    </MenuItem>
                  ))}
              </RtlSelect>
            )}
          />
          {/* todo - add rotation users */}
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
