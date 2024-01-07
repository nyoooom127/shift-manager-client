import { TextField, TextFieldProps, styled } from "@mui/material";
import { ControllerFieldState } from "react-hook-form";

const RtlTextField1 = styled(TextField)({
  "& label": {
    transformOrigin: "top right !important",
    left: "inherit !important",
    right: "1.75rem !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    textAlign: "right !important",
  },
  "& .MuiFormHelperText-root": {
    direction: "rtl",
    textAlign: "right !important",
  },
});

const RtlTextField = ({
  fieldState,
  ...props
}: TextFieldProps & { fieldState?: ControllerFieldState }) => {
  return (
    <RtlTextField1
      {...props}
      fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
      value={props.value !== undefined ? props.value : ""}
      dir={props.dir || "rtl"}
      error={props.error || !!fieldState?.error}
      helperText={props.helperText || fieldState?.error?.message || ""}
    />
  );
};

export default RtlTextField;
