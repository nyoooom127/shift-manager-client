import { Dialog } from "@mui/material";
import "moment/locale/he";
import { Controller, useForm } from "react-hook-form";
import ConstraintType from "../../../../Models/ConstraintType";
import constraintTypesService from "../../../../Services/ConstraintTypesService";
import notification from "../../../../Utils/Notification";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../../SharedArea/StyledForm/StyledForm";

interface ConstraintTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: ConstraintType;
  isNew?: boolean;
}

function ConstraintTypeForm(props: ConstraintTypeFormProps): JSX.Element {
  const { handleSubmit, control, reset } = useForm<ConstraintType>({
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
      <StyledForm onSubmit={handleSubmit(send)} className="ConstraintTypeForm">
        <h2>סוג אילוץ</h2>
        <Controller
          name="name"
          control={control}
          rules={ConstraintType.nameValidation}
          render={({ field, fieldState }) => (
            <RtlTextField
              {...field}
              fieldState={fieldState}
              size="small"
              label="שם"
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

export default ConstraintTypeForm;
