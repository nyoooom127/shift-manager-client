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
import "./ConstraintForm.css";

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
      <div className="ConstraintForm">
        <form onSubmit={handleSubmit(send)}>
          <h2>אילוץ</h2>

          <Controller
            name="type"
            control={control}
            rules={Constraint.typeValidation}
            render={({ field, fieldState, formState }) => (
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
            render={({ field, fieldState }) => {
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
            render={({ field, fieldState }) => {
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
            render={({ field }) => (
              <RtlTextField {...field} size="small" label="הערה" />
            )}
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
