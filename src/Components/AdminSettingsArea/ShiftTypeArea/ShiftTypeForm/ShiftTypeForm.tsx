import { Checkbox, Dialog, FormControlLabel, MenuItem } from "@mui/material";
import moment, { Moment, MomentInput } from "moment";
import "moment/locale/he";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ShiftSchedulingLogic from "../../../../Models/ShiftSchedulingLogic.enum";
import ShiftType from "../../../../Models/ShiftType";
import { AppState } from "../../../../Redux/AppState";
import ShiftTypesService from "../../../../Services/ShiftTypesService";
import notification from "../../../../Utils/Notification";
import {
  getDurationFromShiftTimes,
  getShiftEndTime,
  getShiftStartTime,
} from "../../../../Utils/ShiftUtils";
import RtlAutocomplete from "../../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";
import RtlTimePickerField from "../../../SharedArea/RtlTimePickerField/RtlTimePickerField";
import StyledForm from "../../../SharedArea/StyledForm/StyledForm";

interface ShiftTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: ShiftType;
  isNew?: boolean;
}

function ShiftTypeForm(props: ShiftTypeFormProps): JSX.Element {
  const { handleSubmit, control, setValue, reset } =
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
  const [duration, setDuration] = useState<number>(0);
  const [hasWeekends, setHasWeekends] = useState<boolean>(
    props.initialValues?.hasWeekends
  );

  useEffect(() => {
    setValue("duration", duration);
  }, [duration, setValue]);

  useEffect(() => {
    setValue("startHour", startHour.hour());
    setDuration(getDurationFromShiftTimes(startHour, endHour));
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
      <StyledForm onSubmit={handleSubmit(send)}>
        <h2>סוג משמרת</h2>
        <Controller
          name="name"
          control={control}
          rules={ShiftType.nameValidation}
          render={({ field: { ref, ...field }, fieldState }) => (
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
          render={({ field: { ref, ...field }, fieldState }) => (
            <RtlAutocomplete
              options={allUserTypes}
              onChange={(value) => {
                return field.onChange(value.map((v) => v.id));
              }}
              multiple
              value={field.value?.map((v) =>
                allUserTypes.find((userType) => userType.id === v)
              )}
              labelKey={"name"}
              label="סוגי משתמשים"
              fieldState={fieldState}
            />
          )}
        />
        <div className="FormRow">
          <Controller
            name="startHour"
            control={control}
            rules={ShiftType.startHourValidation}
            render={({ field: { ref, ...field }, fieldState }) => {
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
            render={({ field: { ref, ...field }, fieldState }) => {
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

        <div>משך: {duration} שעות</div>
        <div className="FormRow">
          <Controller
            name="minBreak"
            control={control}
            rules={ShiftType.minBreakValidation}
            render={({ field: { ref, ...field }, fieldState }) => (
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
            render={({ field: { ref, ...field }, fieldState }) => (
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
        <div className="FormRow">
          <Controller
            name="score"
            control={control}
            rules={ShiftType.scoreValidation}
            render={({ field: { ref, ...field }, fieldState }) => (
              <RtlTextField
                {...field}
                fieldState={fieldState}
                label="ניקוד"
                size="small"
                type="number"
              />
            )}
          />
          <Controller
            name="weekendScore"
            control={control}
            rules={ShiftType.weekendScoreValidation}
            render={({ field: { ref, ...field }, fieldState }) => (
              <RtlTextField
                {...field}
                fieldState={fieldState}
                label='ניקוד סופ"ש'
                size="small"
                type="number"
                disabled={!hasWeekends}
              />
            )}
          />
        </div>
        <Controller
          name="hasWeekends"
          control={control}
          render={({ field: { ref, ...field } }) => {
            return (
              <FormControlLabel
                labelPlacement="end"
                label='כולל סופ"ש'
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e, checked) => {
                      setHasWeekends(checked);
                      field.onChange(checked);
                    }}
                  />
                }
              />
            );
          }}
        />
        <div className="FormRow">
          <Controller
            name="schedulingLogic"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => (
              <RtlTextField
                select
                dir="rtl"
                label="שיטת שיבוץ"
                placeholder="שיטת שיבוץ"
                error={!!fieldState.error}
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
              </RtlTextField>
            )}
          />
          <Controller
            name="maxShiftsPerWeek"
            control={control}
            rules={ShiftType.maxShiftsPerWeekValidation}
            render={({ field: { ref, ...field }, fieldState }) => (
              <RtlTextField
                {...field}
                fieldState={fieldState}
                label="מס' משמרות מקס' בשבוע"
                size="small"
                type="number"
              />
            )}
          />
        </div>
        {/* todo - add rotation users */}
        <div className="Buttons">
          <button>שמור</button>
          <button type="button" onClick={handleCancel}>
            בטל
          </button>
        </div>
      </StyledForm>
    </Dialog>
  );
}

export default ShiftTypeForm;
