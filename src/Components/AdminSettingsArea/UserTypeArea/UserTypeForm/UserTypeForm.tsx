import { Checkbox, Dialog, FormControlLabel } from "@mui/material";
import "moment/locale/he";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import UserType from "../../../../Models/UserType";
import { AppState } from "../../../../Redux/AppState";
import userTypesService from "../../../../Services/UserTypesService";
import notification from "../../../../Utils/Notification";
import ColorPicker from "../../../SharedArea/ColorPicker/ColorPicker";
import RtlAutocomplete from "../../../SharedArea/RtlAutocomplete/RtlAutocomplete";
import RtlTextField from "../../../SharedArea/RtlTextField/RtlTextField";
import StyledForm from "../../../SharedArea/StyledForm/StyledForm";

interface UserTypeFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialValues: UserType;
  isNew?: boolean;
}

function UserTypeForm(props: UserTypeFormProps): JSX.Element {
  const { handleSubmit, control, reset } = useForm<UserType>({
    mode: "onChange",
    values: props.initialValues,
  });
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );

  async function send(userType: UserType) {
    try {
      if (props.isNew) {
        await userTypesService.create(userType);
      } else {
        await userTypesService.update(userType);
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
      <StyledForm onSubmit={handleSubmit(send)} className="UserTypeForm">
        <h2>סוג משתמש</h2>
        <Controller
          name="name"
          control={control}
          rules={UserType.nameValidation}
          render={({ field, fieldState }) => (
            <RtlTextField
              {...field}
              fieldState={fieldState}
              label="שם"
              size="small"
              fullWidth
            />
          )}
        />
        <Controller
          name="allowedShiftTypes"
          control={control}
          rules={UserType.allowedShiftTypesValidation}
          render={({ field, fieldState }) => (
            <RtlAutocomplete
              options={allShiftTypes}
              {...field}
              fieldState={fieldState}
              labelKey={"name"}
              label="משמרות מותרות"
              multiple
              fullWidth
            />
          )}
        />
        <Controller
          name="color"
          control={control}
          rules={UserType.colorValidation}
          render={({ field, fieldState }) => (
            <ColorPicker
              color={field.value}
              fieldState={fieldState}
              onChange={field.onChange}
            />
          )}
        />
        <div className="FormRow">
          <Controller
            name="autoScheduled"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  label="שיבוץ אוטומטי"
                  labelPlacement="end"
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
            name="isQualified"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  label="ראשי"
                  labelPlacement="end"
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
        </div>
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

export default UserTypeForm;
