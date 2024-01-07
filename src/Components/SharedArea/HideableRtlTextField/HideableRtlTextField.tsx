import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { ControllerFieldState } from "react-hook-form";
import RtlTextField from "../RtlTextField/RtlTextField";

const HideableRtlTextField = (
  props: TextFieldProps & { fieldState?: ControllerFieldState }
) => {
  const [showField, setShowField] = useState<boolean>(false);
  const handleClickShowField = () => setShowField(!showField);
  const handleMouseDownField = () => setShowField(!showField);

  return (
    <RtlTextField
      {...props}
      dir={props.dir || "ltr"}
      type={showField ? "text" : "password"}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position={props.dir === "ltr" ? "end" : "start"}>
            <IconButton
              aria-label="toggle field visibility"
              onClick={handleClickShowField}
              onMouseDown={handleMouseDownField}
            >
              {showField ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default HideableRtlTextField;
