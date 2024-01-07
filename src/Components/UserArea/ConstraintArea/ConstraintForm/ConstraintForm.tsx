import { Dialog } from "@mui/material";
import "moment/locale/he";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Constraint from "../../../../Models/Constraint";
import { AppState } from "../../../../Redux/AppState";
import constraintsService from "../../../../Services/ConstraintsService";
import notification from "../../../../Utils/Notification";
import { isAdmin } from "../../../../Utils/UserUtils";
import DayNightDatePicker from "../../../SharedArea/DayNightPicker/DayNightDatePicker";
import RtlAutocomplete from "../../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../../SharedArea/StyledForm/StyledForm";

interface ConstraintFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: Constraint;
  constraints: Constraint[];
}

export type ConstraintFormFields = Constraint & { constraints: Constraint[] };

function ConstraintForm(props: ConstraintFormProps): JSX.Element {
  const { handleSubmit, control, reset, trigger } =
    useForm<ConstraintFormFields>({
      mode: "onChange",
      values: { ...props.initialValues, constraints: props.constraints },
    });
  const allConstraintTypes = useSelector(
    (appState: AppState) => appState.constraintTypes
  );
  const auth = useSelector((appState: AppState) => appState.auth);

  async function send({ constraints, ...constraint }: ConstraintFormFields) {
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

  async function handleDelete() {
    try {
      await constraintsService.delete(props.initialValues.id);
      reset();
      props.setOpen(false);
    } catch (err: any) {
      notification.error(err);
    }
  }

  return (
    <Dialog open={props.open}>
      <StyledForm onSubmit={handleSubmit(send)}>
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
              <DayNightDatePicker
                {...field}
                isStart
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
              <DayNightDatePicker
                {...field}
                isStart={false}
                onChange={(value) => {
                  field.onChange(value);
                  trigger("startDate");
                }}
                fieldState={fieldState}
                label="תאריך סיום (כולל)"
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
          {isAdmin(auth) && (
            <button type="button" onClick={handleDelete}>
              מחק
            </button>
          )}
          {/* todo - add delete for admin */}
        </div>
      </StyledForm>
    </Dialog>
  );
}

export default ConstraintForm;
