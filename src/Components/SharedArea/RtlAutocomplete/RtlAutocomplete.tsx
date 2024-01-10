import {
  Autocomplete,
  AutocompleteFreeSoloValueMapping,
  AutocompleteProps,
  AutocompleteValue,
  Box,
  styled,
} from "@mui/material";
import { ControllerFieldState } from "react-hook-form";
import RtlTextField from "../RtlTextField/RtlTextField";

const RtlAutocomplete1 = styled(Autocomplete)({
  "& label": {
    transformOrigin: "top right !important",
    left: "inherit !important",
    right: "1.75rem !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    textAlign: "right !important",
  },
  "& .MuiAutocomplete-endAdornment": {
    left: "9px",
    right: "unset !important",
  },
  "&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot":
    {
      "padding-left": "65px !important",
    },
  "&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root, .MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root":
    {
      "padding-right": "9px !important",
      "padding-left": "39px !important",
    },
}) as typeof Autocomplete;

const RtlOption = styled(Box)({
  width: "100%",
  "text-align": "right",
});

type RtlAutocompleteProps<
  TOption extends Partial<Record<keyof TOption, TOption[keyof TOption]>>,
  // TInternal extends TOption[TProp],
  // TProp extends keyof TOption,
  TLabel extends keyof TOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = Omit<
  AutocompleteProps<TOption, Multiple, DisableClearable, FreeSolo>,
  "value" | "onChange" | "options" | "renderInput"
> & {
  // valueKey?: TProp;
  labelKey: TLabel;
  value: AutocompleteValue<TOption, Multiple, DisableClearable, FreeSolo>;
  onChange: (
    value: AutocompleteValue<TOption, Multiple, DisableClearable, FreeSolo>
  ) => void;
  options: TOption[];
  label: string;
  fieldState?: ControllerFieldState;
};

function RtlAutocomplete<
  TOption extends Record<keyof TOption, TOption[keyof TOption]>,
  // TInternal extends TOption[TProp],
  // TProp extends keyof TOption,
  TLabel extends keyof TOption,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
>({
  // valueKey,
  value,
  labelKey,
  label,
  onChange,
  fieldState,
  ...props
}: RtlAutocompleteProps<
  TOption,
  TLabel,
  Multiple,
  DisableClearable,
  FreeSolo
>) {
  // const options = props.options.map((option) => option[valueKey]);

  const getOptionLabel = (
    option: TOption | AutocompleteFreeSoloValueMapping<FreeSolo>
  ) => {
    if (typeof option === "string") {
      return option;
    } else {
      // const item = props.options.find((o) => o === option);
      return option[labelKey];

      // if (!!item) {
      //   return item[labelKey];
      // } else {
      //   return "NOT FOUND";
      // }
    }
  };

  return (
    <RtlAutocomplete1
      {...props}
      fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
      dir={props.dir || "rtl"}
      // options={options}
      onChange={(e, value) => {
        return onChange(value);
      }}
      value={value}
      renderOption={(params, option) => (
        <li {...params}>
          <RtlOption>{getOptionLabel(option)}</RtlOption>
        </li>
      )}
      limitTags={4}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) =>
        option === value || getOptionLabel(option) === getOptionLabel(value)
      }
      ListboxProps={{
        sx: {
          maxHeight: "13.6rem",
          overflow: "auto",
        },
      }}
      // todo: fix rtl buttons
      renderInput={(params) => (
        <RtlTextField
          {...params}
          fieldState={fieldState}
          label={label}
          // inputProps={{
          //   ...params.inputProps,
          //   endAdornment: {
          //     left: "9px",
          //     right: "unset !important",
          //   },
          // }}
          // InputProps={{
          //   ...params.InputProps,
          //   startAdornment: <div>{params.InputProps.endAdornment}</div>,
          //   endAdornment: null,
          //   color: "error",
          // }}
        />
      )}
    />
  );
}

// const a = forwardRef<
//   JSX.Element,
//     RtlAutocompleteProps<
//       TOption,
//       // TInternal,
//       // TProp,
//       TLabel,
//       Multiple,
//       DisableClearable,
//       FreeSolo
//     >
// >(RtlAutocomplete);

export default RtlAutocomplete;
