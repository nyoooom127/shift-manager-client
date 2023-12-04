import { Dialog } from "@mui/material";
import "moment/locale/he";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Week from "../../../Models/Week";
import { AppState } from "../../../Redux/AppState";
import weeksService from "../../../Services/WeeksService";
import notification from "../../../Utils/Notification";
import RtlAutocomplete from "../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlDatePickerField from "../../SharedArea/RtlDatePickerField/RtlDatePickerField";
import StyledForm from "../../SharedArea/StyledForm/StyledForm";

interface WeekFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Week;
}

function WeekForm(props: WeekFormProps): JSX.Element {
  const { handleSubmit, control, reset } = useForm<Week>({
    mode: "onChange",
    values: props.initialValues,
  });
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
      <StyledForm onSubmit={handleSubmit(send)} className="WeekForm">
        <h2>שבוע</h2>

        <Controller
          name="type"
          control={control}
          rules={Week.typeValidation}
          render={({ field: { ref, ...field }, fieldState }) => (
            <RtlAutocomplete
              {...field}
              fieldState={fieldState}
              options={allWeekTypes}
              labelKey={"name"}
              label="סוג שבוע"
            />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          rules={Week.startDateValidation}
          render={({ field: { ref, ...field }, fieldState }) => (
            <RtlDatePickerField
              {...field}
              fieldState={fieldState}
              label="תאריך התחלה"
            />
          )}
        />
        <div className="buttons">
          <button>שמור שבוע</button>
          <button type="button" onClick={handleCancel}>
            בטל
          </button>
        </div>
      </StyledForm>
    </Dialog>
  );
}

export default WeekForm;
