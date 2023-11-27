import { ClickAwayListener, FormHelperText, Popover } from "@mui/material";
import { MouseEvent, useState } from "react";
import { ColorResult, SketchPicker, SketchPickerProps } from "react-color";
import { ControllerFieldState } from "react-hook-form";
import "./ColorPicker.css";

type ColorPickerProps = Omit<SketchPickerProps, "onChange" | "value"> & {
  color: string;
  onChange: (value: string) => void;
  fieldState: ControllerFieldState;
};

function ColorPicker(props: ColorPickerProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [ref, setRef] = useState<Element>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (ref === null) {
      setRef(e.currentTarget);
    }

    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const onChange = (color: ColorResult) => {
    props.onChange(color.hex);
  };

  return (
    <div className="ColorPicker">
      <button
        type="button"
        onClick={handleClick}
        style={{ backgroundColor: props.color.toString() }}
      >
        צבע
      </button>
      <FormHelperText error={!!props.fieldState?.error}>
        {props.fieldState?.error?.message || ""}
      </FormHelperText>
      {open && (
        <Popover
          disablePortal
          //   sx={{width: 'fit-content'}}
          open={open}
          anchorEl={ref}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <SketchPicker
              // <ChromePicker
              color={props.color}
              onChangeComplete={onChange}
              // onChange={onChange}
              disableAlpha
              presetColors={[
                "#E6A5A4",
                "#E7B4CC",
                "#B0E4B8",
                "#8fc5d7",
                "#ffb8a3",
                "#fff6a3",
                "#E1A3FF",
              ]}
            />
          </ClickAwayListener>
        </Popover>
      )}
    </div>
  );
}

export default ColorPicker;
