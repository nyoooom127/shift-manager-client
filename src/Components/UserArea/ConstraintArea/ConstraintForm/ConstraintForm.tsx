import { Dialog } from "@mui/material";
import "moment/locale/he";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Constraint from "../../../../Models/Constraint";
import { AppState } from "../../../../Redux/AppState";
import constraintsService from "../../../../Services/ConstraintsService";
import notification from "../../../../Utils/Notification";
import RtlAutocomplete from "../../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlDateTimePickerField from "../../../SharedArea/RtlDateTimePickerField/RtlDateTimePickerField";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../../SharedArea/StyledForm/StyledForm";

interface ConstraintFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Constraint;
}

function ConstraintForm(props: ConstraintFormProps): JSX.Element {
  const { handleSubmit, control, reset, trigger } = useForm<Constraint>({
    mode: "onChange",
    values: props.initialValues,
  });
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

  return (
    <Dialog open={props.open}>
      <StyledForm onSubmit={handleSubmit(send)} className="ConstraintForm">
        <h2>אילוץ</h2>

        <Controller
          name="type"
          control={control}
          rules={Constraint.typeValidation}
          render={({ field: { ref, ...field }, fieldState }) => (
            <RtlAutocomplete
              {...field}
              fieldState={fieldState}
              options={allConstraintTypes}
              labelKey={"name"}
              label="סוג אילוץ"
            />
          )}
        />
        <Controller
          name="startDate"
          control={control}
          rules={Constraint.startDateValidation}
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <RtlDateTimePickerField
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  trigger("endDate");
                }}
                fieldState={fieldState}
                label="תאריך התחלה"
              />
            );
          }}
        />
        <Controller
          name="endDate"
          control={control}
          rules={Constraint.endDateValidation}
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <RtlDateTimePickerField
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  trigger("startDate");
                }}
                fieldState={fieldState}
                label="תאריך סיום"
              />
            );
          }}
        />
        <Controller
          name="comment"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => (
            <RtlTextField
              {...field}
              fieldState={fieldState}
              size="small"
              label="הערה"
            />
          )}
        />
        <div className="Buttons">
          <button>שמור אילוץ</button>
          <button type="button" onClick={handleCancel}>
            בטל
          </button>
        </div>
      </StyledForm>
    </Dialog>
  );
}

export default ConstraintForm;
