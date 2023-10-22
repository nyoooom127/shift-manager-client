import { TableCell, TableRow } from "@mui/material";
import moment, { Moment } from "moment";
import "./CalendarRow.css";
import ShiftType from "../../../Models/ShiftType";
import Shift from "../../../Models/Shift";
import User from "../../../Models/User";
import { connect } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import { isSameDay } from "../../../Utils/DateUtils";
import "moment/locale/he";
import { useEffect } from "react";
import ShiftCell from "../ShiftCell/ShiftCell";

interface CalendarRowProps {
  weekDays: Moment[];
  shiftType: ShiftType;
  shifts: Shift[];
  users: User[];
  onShiftClick: (shift: Shift) => void;
}

function CalendarRow(props: CalendarRowProps): JSX.Element {
  useEffect(() => {
    console.log(props.shifts);
  }, [props.shifts]);

  return (
    // <div >
    <TableRow
      className="CalendarRow"
      key={props.shiftType.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell variant="head" align="center" className="leftDivider">
        {props.shiftType.name}
        <br />
        {moment()
          .startOf("day")
          .hour(props.shiftType.startHour)
          .format("HH:mm")}
        -
        {moment()
          .startOf("day")
          .hour(props.shiftType.startHour)
          .add(props.shiftType.duration, "h")
          .format("HH:mm")}
      </TableCell>
      {props.weekDays.map((day) => (
        <ShiftCell
          key={props.shiftType.id + day.format()}
          shift={props.shifts.find((shift) => isSameDay(shift.startDate, day))}
          onClickShift={props.onShiftClick}
          date={day}
          shiftType={props.shiftType}
        />
        // <TableCell align="center"  onClick={}>
        //   {
        //     props.users.find(
        //       (user) =>
        //         user.id ===
        //         props.shifts.find((shift) => isSameDay(shift.startDate, day))
        //           ?.user
        //     )?.fullName
        //   }
        // </TableCell>
      ))}
    </TableRow>
    // </div>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(CalendarRow);
