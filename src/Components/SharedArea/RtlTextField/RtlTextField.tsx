import { TextField, TextFieldProps, styled } from "@mui/material";

const RtlTextField1 = styled(TextField)({
  "& label": {
    transformOrigin: "top right !important",
    left: "inherit !important",
    right: "1.75rem !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    textAlign: "right !important",
  },
});

const RtlTextField = (props: TextFieldProps) => {
  return <RtlTextField1 {...props} />;
};

export default RtlTextField;
