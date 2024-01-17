import { TableCell, TableRow } from "@mui/material";
import { Moment } from "moment";
import "moment/locale/he";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Shift from "../../../Models/Shift";
import User from "../../../Models/User";
import Week from "../../../Models/Week";
import { AppState } from "../../../Redux/AppState";
import { isWeekend } from "../../../Utils/DateUtils";
import "./CalendarRowPrint.css";

interface CalendarRowPrintProps {
  // weeks: Week[];
  users: User[];
  isEdit: boolean;
  currentWeek: Week;
  date: Moment;
  shifts: Shift[];
}

function CalendarRowPrint({
  isEdit,
  currentWeek,
  date,
  shifts,
  users,
}: CalendarRowPrintProps): JSX.Element {
  if (!currentWeek) {
    return null;
  }

  return (
    <TableRow key={date.format()} className={`CalendarRowPrint`}>
      <TableCell
        width="10%"
        align="center"
        key={date.format() + "123"}
        className={isWeekend(date) ? "WeekendCell" : "DayCell"}
      >
        {date.format("dd")}
      </TableCell>
      <TableCell width="10%" align="center" key={date.format() + "321"}>
        {date.format("DD")}
      </TableCell>
      {[...currentWeek.type.requiredShifts]
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((shiftType) => {
          const shift = shifts.find((shift) => shift.type.id === shiftType.id);

          return (
            <TableCell
              width={`${80 / currentWeek.type.requiredShifts.length}%`}
              align="center"
              key={shift?.id || uuidv4()}
            >
              {shift
                ? users.find((user) => user.id === shift.user)?.fullName
                : ""}
            </TableCell>
          );
        })}
    </TableRow>
  );
}

const mapStateToProps = (appState: AppState) => ({
  users: appState.users,
});

export default connect(mapStateToProps)(CalendarRowPrint);
