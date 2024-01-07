import {
  Select,
  styled
} from "@mui/material";

const RtlSelect = styled(Select)({
  "& label": {
    transformOrigin: "top right !important",
    left: "inherit !important",
    right: "1.75rem !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    textAlign: "right !important",
  },
  "& .MuiSelect-endAdornment": {
    left: "9px",
    right: "unset !important",
  },
  "&.MuiSelect-hasPopupIcon.MuiSelect-hasClearIcon .MuiSelect-inputRoot": {
    "padding-left": "65px !important",
  },
  "&.MuiSelect-hasPopupIcon .MuiOutlinedInput-root, .MuiSelect-hasClearIcon .MuiOutlinedInput-root":
    {
      "padding-right": "9px !important",
      "padding-left": "39px !important",
    },
}); //as typeof Select;

// const RtlOption = styled(Box)({
//   width: "100%",
//   "text-align": "right",
// });

// type RtlSelectProps<TValue extends string | number> = 
//   Omit<SelectProps<TValue>, 'onChange' | 'value'> & {
//   // valueKey?: TProp;
//   // labelKey: TLabel;
//   value: TValue;
//   onChange: (
//     value: TValue
//   ) => void;
//   options: TValue[];
//   label: string;
//   fieldState?: ControllerFieldState;
// };

// function RtlSelect<TValue extends string | number
//   // TOption extends Record<keyof TOption, TOption[keyof TOption]>,
//   // // TInternal extends TOption[TProp],
//   // // TProp extends keyof TOption,
//   // TLabel extends keyof TOption,
//   // Multiple extends boolean | undefined = false,
//   // DisableClearable extends boolean | undefined = false,
//   // FreeSolo extends boolean | undefined = false
// >({
//   // valueKey,
//   value,
//   // labelKey,
//   label,
//   onChange,
//   fieldState,
//   options,
//   ...props
// }: RtlSelectProps<TValue>) {
//   // const options = props.options.map((option) => option[valueKey]);

//   // const getOptionLabel = (
//   //   option: TOption | SelectFreeSoloValueMapping<FreeSolo>
//   // ) => {
//   //   if (typeof option === "string") {
//   //     return option;
//   //   } else {
//   //     // const item = props.options.find((o) => o === option);
//   //     return option[labelKey];

//   //     // if (!!item) {
//   //     //   return item[labelKey];
//   //     // } else {
//   //     //   return "NOT FOUND";
//   //     // }
//   //   }
//   // };

//   return (
//     // <RtlSelect1
//     //   {...props}
//     //   dir={props.dir || "rtl"}
//     //   // options={options}
//     //   onChange={(e) => {
//     //     // return onChange(e.target.value);
//     //   }}
//     //   // value={value}
//     //   label={label}
//     //   // renderOption={(params, option) => (
//     //   //   <li {...params}>
//     //   //     <RtlOption>{getOptionLabel(option)}</RtlOption>
//     //   //   </li>
//     //   // )}
//     //   // getOptionLabel={getOptionLabel}
//     //   // isOptionEqualToValue={(option, value) =>
//     //   //   option === value || getOptionLabel(option) === getOptionLabel(value)
//     //   // }
//     //   // todo: fix rtl buttons
//     //   //   renderInput={(params) => (
//     //   //     <RtlTextField
//     //   //       {...params}
//     //   //       fieldState={fieldState}
//     //   //       label={label}
//     //   //       // inputProps={{
//     //   //       //   ...params.inputProps,
//     //   //       //   endAdornment: {
//     //   //       //     left: "9px",
//     //   //       //     right: "unset !important",
//     //   //       //   },
//     //   //       // }}
//     //   //       // InputProps={{
//     //   //       //   ...params.InputProps,
//     //   //       //   startAdornment: <div>{params.InputProps.endAdornment}</div>,
//     //   //       //   endAdornment: null,
//     //   //       //   color: "error",
//     //   //       // }}
//     //   // // value={field.value}
//     //   // // options=
//     //   // onChange={(e) => {
//     //   //   return field.onChange(e.target.value);
//     //   // }}
//     //   // multiple
//     //   // value={field.value.map((v) =>
//     //   //   allUserTypes.find((userType) => userType.id === v)
//     //   // )}
//     //   // renderOption={(params, option) => (
//     //   //   <li {...params}>{option.name}</li>
//     //   // )}
//     //   // getOptionLabel={(option) => option.name}
//     //   // renderInput={(params) => <TextField {...params} size="small" />}
//     // >
//     //   {options
//     //     .map((option, index) => (
//     //       <MenuItem key={index} value={option}>
//     //         {option}
//     //       </MenuItem>
//     //     ))}
//     // </RtlSelect1>
//     // // )}
//     // />
//     <></>
//   );
// }

// // const a = forwardRef<
// //   JSX.Element,
// //     RtlSelectProps<
// //       TOption,
// //       // TInternal,
// //       // TProp,
// //       TLabel,
// //       Multiple,
// //       DisableClearable,
// //       FreeSolo
// //     >
// // >(RtlSelect);

export default RtlSelect;
