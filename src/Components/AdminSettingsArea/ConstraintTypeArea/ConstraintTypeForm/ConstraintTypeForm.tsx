import { Controller, useForm } from "react-hook-form";
import notification from "../../../../Utils/Notification";
import "./ConstraintTypeForm.css";
import { Dialog } from "@mui/material";
import "moment/locale/he";
import ConstraintType from "../../../../Models/ConstraintType";
import constraintTypesService from "../../../../Services/ConstraintTypesService";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";

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
      <div className="ConstraintTypeForm">
        <form onSubmit={handleSubmit(send)}>
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
          <div className="buttons">
            <button>שמור סוג אילוץ</button>
            <button type="button" onClick={handleCancel}>
              בטל
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default ConstraintTypeForm;
