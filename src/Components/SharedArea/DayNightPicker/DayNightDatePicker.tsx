import styled, { css } from "styled-components";
import RtlDatePickerField, {
  RtlDatePickerFieldProps,
} from "../RtlDatePickerField/RtlDatePickerField";

export type DayNightField = "day" | "night" | null;

const StyledDayNightDatePicker = styled.div.attrs((props) => ({
  className: "StyledDayNightDatePicker " + props.className,
}))`
  text-align: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 2rem;
  justify-content: space-between;
  width: 100%;
`;

const StyledDayNightPickerWrapper = styled.div.attrs((props) => ({
  className: "StyledDayNightPickerWrapper " + props.className,
}))`
  text-align: center;
  display: grid;
  flex-direction: column;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  border: 1px solid gray;
  border-radius: 2px;
  justify-content: space-between;
`;

interface StyledDayNightPickerProps {
  isActive?: boolean;
}

const StyledDayNightPicker = styled.div.attrs((props) => ({
  className: "StyledDayNightPicker " + props.className,
}))<StyledDayNightPickerProps>`
  text-align: center;
  padding: 4px 10px;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #e1e1e1e1;
    cursor: pointer;
  }

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: #1976d2;
          color: white;

          &:hover {
            background-color: #1955d2;
          }
        `
      : ""}
`;

type DayNightDatePickerProps = RtlDatePickerFieldProps & {
  isStart: boolean;
  dayNightField: DayNightField;
  setDayNightField: (dayNightField: DayNightField) => void;
};

function DayNightDatePicker({
  isStart,
  dayNightField,
  setDayNightField,
  ...props
}: DayNightDatePickerProps): JSX.Element {
  function onClickDay() {
    setDayNightField(dayNightField === "day" ? null : "day");
  }

  function onClickNight() {
    setDayNightField(dayNightField === "night" ? null : "night");
  }

  return (
    <StyledDayNightDatePicker>
      <RtlDatePickerField {...props} />
      <StyledDayNightPickerWrapper>
        <StyledDayNightPicker
          isActive={dayNightField === "day" || undefined}
          onClick={onClickDay}
        >
          יום
        </StyledDayNightPicker>
        <StyledDayNightPicker
          isActive={dayNightField === "night" || undefined}
          onClick={onClickNight}
        >
          לילה
        </StyledDayNightPicker>
      </StyledDayNightPickerWrapper>
    </StyledDayNightDatePicker>
  );
}

export default DayNightDatePicker;
