import {
    LocalizationProvider,
    TimePicker,
    TimePickerProps,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { MomentInput } from "moment";
import { ControllerFieldState } from "react-hook-form";
import RtlTextField from "../RtlTextField/RtlTextField";

const RtlTimePickerField = (
  props: TimePickerProps<MomentInput> & {
    fieldState?: ControllerFieldState;
    label?: string;
  }
) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he">
      <TimePicker
        {...props}
        value={moment(props.value)}
        slots={{
          textField: RtlTextField,
        }}
        slotProps={{
          textField: {
            dir: "rtl",
            error: !!props.fieldState?.error,
            helperText: props.fieldState?.error?.message || "",
            label: props.label,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default RtlTimePickerField;
