import {
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { MomentInput } from "moment";
import { ControllerFieldState } from "react-hook-form";
import RtlTextField from "../RtlTextField/RtlTextField";

const RtlDateTimePickerField = ({
  fieldState,
  label,
  ...props
}: DateTimePickerProps<MomentInput> & {
  fieldState?: ControllerFieldState;
  label?: string;
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he">
        <DateTimePicker
          {...props}
          value={moment(props.value)}
          slots={{
            textField: RtlTextField,
          }}
          slotProps={{
            textField: {
              dir: "rtl",
              error: !!fieldState?.error,
              helperText: fieldState?.error?.message || "",
              label: label,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default RtlDateTimePickerField;
