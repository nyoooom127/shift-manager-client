import { TableCell, TableRow } from "@mui/material";
import moment, { Moment } from "moment";
import "moment/locale/he";
import { connect } from "react-redux";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import { isSameDay } from "../../../Utils/DateUtils";
import ShiftCell from "../ShiftCell/ShiftCell";
import "./CalendarRow.css";

interface CalendarRowProps {
  weekDays: Moment[];
  shiftType: ShiftType;
  shifts: Shift[];
  users: User[];
  onShiftClick: (shift: Shift) => void;
  weekId: string;
  isEdit: boolean;
}

function CalendarRow(props: CalendarRowProps): JSX.Element {

  return (
    // <div >
    <TableRow
      className={`CalendarRow${props.isEdit ? "" : " CalendarRow-View"}`
      }
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
          weekId={props.weekId}
          isEdit={props.isEdit}
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
