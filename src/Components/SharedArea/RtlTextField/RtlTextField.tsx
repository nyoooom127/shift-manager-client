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

const RtlTextField = (
  props: TextFieldProps & { fieldState?: ControllerFieldState }
) => {
  return (
    <RtlTextField1
      {...props}
      dir={props.dir || "rtl"}
      error={props.error || !!props.fieldState?.error}
      helperText={props.helperText || props.fieldState?.error?.message || ""}
    />
  );
};

export default RtlTextField;
