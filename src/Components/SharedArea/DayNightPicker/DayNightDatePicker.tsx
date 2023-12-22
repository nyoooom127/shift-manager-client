import moment from "moment";
import styled, { css } from "styled-components";
import RtlDatePickerField, {
  RtlDatePickerFieldProps,
} from "../RtlDatePickerField/RtlDatePickerField";

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
};

function DayNightDatePicker({
  isStart,
  ...props
}: DayNightDatePickerProps): JSX.Element {
  function getDayDate() {
    if (isStart) {
      return moment(props.value).clone().hour(8).minute(5);
    } else {
      return moment(props.value).clone().hour(19).minute(55);
    }
  }

  function getNightDate() {
    if (isStart) {
      return moment(props.value).clone().hour(20).minute(5);
    } else {
      return moment(props.value).clone().hour(7).minute(55);
    }
  }

  function onClickDay() {
    const newDate = getDayDate();

    props.onChange(newDate.format());
  }

  function onClickNight() {
    const newDate = getNightDate();

    props.onChange(newDate.format());
  }

  return (
    <StyledDayNightDatePicker>
      <RtlDatePickerField {...props} />
      <StyledDayNightPickerWrapper>
        <StyledDayNightPicker
          isActive={getDayDate().isSame(props.value, "minute") || undefined}
          onClick={onClickDay}
        >
          יום
        </StyledDayNightPicker>
        <StyledDayNightPicker
          isActive={getNightDate().isSame(props.value, "minute") || undefined}
          onClick={onClickNight}
        >
          לילה
        </StyledDayNightPicker>
      </StyledDayNightPickerWrapper>
    </StyledDayNightDatePicker>
  );
}

export default DayNightDatePicker;
