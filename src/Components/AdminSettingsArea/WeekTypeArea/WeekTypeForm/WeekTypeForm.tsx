import { Dialog } from "@mui/material";
import "moment/locale/he";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import WeekType from "../../../../Models/WeekType";
import { AppState } from "../../../../Redux/AppState";
import weekTypesService from "../../../../Services/WeekTypesService";
import notification from "../../../../Utils/Notification";
import RtlAutocomplete from "../../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../../SharedArea/StyledForm/StyledForm";

interface WeekTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: WeekType;
  isNew?: boolean;
}

function WeekTypeForm(props: WeekTypeFormProps): JSX.Element {
  const { handleSubmit, control, reset } = useForm<WeekType>({
    mode: "onChange",
    values: props.initialValues,
  });
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );

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
      <StyledForm onSubmit={handleSubmit(send)} className="WeekTypeForm">
        <h2>סוג שבוע</h2>
        <Controller
          name="name"
          control={control}
          rules={WeekType.nameValidation}
          render={({ field, fieldState }) => (
            <RtlTextField
              {...field}
              fieldState={fieldState}
              label="שם"
              size="small"
            />
          )}
        />
        <Controller
          name="requiredShifts"
          control={control}
          rules={WeekType.requiredShiftsValidation}
          render={({ field, fieldState }) => (
            <RtlAutocomplete
              options={allShiftTypes}
              {...field}
              fieldState={fieldState}
              labelKey={"name"}
              label="משמרות נדרשות"
              multiple
              fullWidth
            />
          )}
        />
        <div className="Buttons">
          <button>שמור סוג אילוץ</button>
          <button type="button" onClick={handleCancel}>
            בטל
          </button>
        </div>
      </StyledForm>
    </Dialog>
  );
}

export default WeekTypeForm;
