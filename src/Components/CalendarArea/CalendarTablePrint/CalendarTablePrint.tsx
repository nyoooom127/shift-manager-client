import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment, { Moment } from "moment";
import "moment/locale/he";
import { connect } from "react-redux";
import Week from "../../../Models/Week";
import { AppState } from "../../../Redux/AppState";
import { isSameDay } from "../../../Utils/DateUtils";
import CalendarRowPrint from "../CalendarRowPrint/CalendarRowPrint";
import "./CalendarTablePrint.css";

interface CalendarTablePrintProps {
  // weeks: Week[];
  // users: User[];
  isEdit: boolean;
  currentWeek: Week;
  weekDays: Moment[];
  date: Moment;
}

function CalendarTablePrint({
  isEdit,
  currentWeek,
  weekDays,
  date,
}: CalendarTablePrintProps): JSX.Element {
  if (!currentWeek) {
    return (
      <div className="noWeek">
        <p>לא קיים שבוע</p>
      </div>
    );
  }

  return (
    <div className={`CalendarTablePrint`}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="10%" />
            <TableCell width="10%" />
            {[...currentWeek.type.requiredShifts]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((shiftType) => (
                <TableCell
                  width={`${80 / currentWeek.type.requiredShifts.length}%`}
                  align="center"
                  key={shiftType.id}
                  className="shiftType"
                >
                  {shiftType.name}
                  <br />
                  {moment()
                    .startOf("day")
                    .hour(shiftType.startHour)
                    .format("HH:mm")}
                  -
                  {moment()
                    .startOf("day")
                    .hour(shiftType.startHour)
                    .add(shiftType.duration, "h")
                    .format("HH:mm")}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weekDays.map((day) => (
            <CalendarRowPrint
              key={day.format()}
              date={day}
              currentWeek={currentWeek}
              isEdit={isEdit}
              shifts={currentWeek.shifts.filter((shift) =>
                isSameDay(shift.startDate, day)
              )}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(CalendarTablePrint);
