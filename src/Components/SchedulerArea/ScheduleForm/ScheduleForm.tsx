import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import weeksService from "../../../Services/WeeksService";
import notification from "../../../Utils/Notification";
import RtlAutocomplete from "../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlDatePickerField from "../../SharedArea/RtlDatePickerField/RtlDatePickerField";
import StyledForm from "../../SharedArea/StyledForm/StyledForm";

interface ScheduleFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Shift;
  clearShift: () => void;
}

function ScheduleForm(props: ScheduleFormProps): JSX.Element {
  const { handleSubmit, control, getValues, reset } = useForm<Shift>({
    mode: "onChange",
    values: props.initialValues,
  });

  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );

  const allUsers = useSelector((appState: AppState) => appState.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  //todo - fix
  // const filteredUsers = useMemo<User[]>(() => allUsers.filter((user) => {
  //   if (!getValues().type) {
  //     return true;
  //   }

  //   const overlappingTypes = user.types.filter((type) =>
  //     getValues().type.allowedUserTypeIds.includes(type.id)
  //   );

  //   return (
  //     overlappingTypes &&
  //     overlappingTypes.length &&
  //     (!getValues().type.isNeedQualified ||
  //       overlappingTypes.some((t) => t.isQualified) ||
  //       user.isQualified)
  //   );
  // }), [allUsers, getValues().type])

  useEffect(() => {
    setFilteredUsers(
      allUsers.filter((user) => {
        if (!getValues().type) {
          return true;
        }

        const overlappingTypes = user.types.filter((type) =>
          getValues().type.allowedUserTypeIds.includes(type.id)
        );

        return (
          overlappingTypes &&
          overlappingTypes.length &&
          (!getValues().type.isNeedQualified ||
            overlappingTypes.some((t) => t.isQualified) ||
            user.isQualified)
        );
      })
    );
  }, [allUsers, getValues().type]);

  async function send(shift: Shift) {
    try {
      await weeksService.addShiftToWeek(shift);
      reset();
      props.setOpen(false);
      props.clearShift();
    } catch (err: any) {
      notification.error(err);
    }
  }

  function handleCancel() {
    reset();
    props.setOpen(false);
    props.clearShift();
  }

  async function handleDelete() {
    try {
      await weeksService.removeShiftFromWeek(props.initialValues);
      reset();
      props.setOpen(false);
      props.clearShift();
    } catch (err: any) {
      notification.error(err);
    }
  }

  return (
    <Dialog open={props.open}>
      <StyledForm onSubmit={handleSubmit(send)} className="ScheduleForm">
        <h2>משמרת</h2>

        <Controller
          name="startDate"
          control={control}
          rules={Shift.startDateValidation}
          render={({ field, fieldState }) => {
            return (
              <RtlDatePickerField
                {...field}
                fieldState={fieldState}
                label={"תאריך"}
              />
            );
          }}
        />
        <Controller
          name="type"
          control={control}
          rules={Shift.typeValidation}
          render={({ field, fieldState, formState }) => (
            <RtlAutocomplete
              {...field}
              fieldState={fieldState}
              options={allShiftTypes}
              labelKey={"name"}
              label="סוג משמרת"
            />
          )}
        />

        <Controller
          name="user"
          control={control}
          render={({ field, fieldState, formState }) => (
            <RtlAutocomplete
              fieldState={fieldState}
              options={filteredUsers}
              onChange={(value) => {
                return field.onChange(value?.id);
              }}
              value={allUsers.find((user) => {
                return user.id === field.value;
              })}
              labelKey={"fullName"}
              label="משתמש"
            />
          )}
        />
        <div className="Buttons">
          <button>שמור משמרת</button>
          <button type="button" onClick={handleCancel}>
            בטל
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!props.initialValues?.id}
          >
            מחק
          </button>
        </div>
      </StyledForm>
    </Dialog>
  );
}

export default ScheduleForm;
