import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment, { Moment } from "moment";
import "moment/locale/he";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Shift from "../../Models/Shift";
import User from "../../Models/User";
import Week from "../../Models/Week";
import { AppState } from "../../Redux/AppState";
import { getWeekDays, isDateInWeek } from "../../Utils/DateUtils";
import "./CalendarTable.css";
import CalendarRow from "./CalendarRow/CalendarRow";
import ScheduleForm from "../SchedulerArea/ScheduleForm/ScheduleForm";
import weeksService from "../../Services/WeeksService";

interface CalendarAreaProps {
  weeks: Week[];
  users: User[];
}

function CalendarArea(props: CalendarAreaProps): JSX.Element {
  const [date, setDate] = useState<Moment>(moment().day(0));
  const [weekDays, setWeekDays] = useState<Moment[]>(getWeekDays(date));
  const [currentWeek, setCurrentWeek] = useState<Week>();
  const [currShifts, setCurrShifts] = useState<Shift[]>([]);
  const [scheduleFormOpen, setScheduleFormOpen] = useState<boolean>(false);
  const [currentShift, setCurrentShift] = useState<Shift>();

  //   const days = Object.keys([...Array(7)]);
  //   props.weeks;

  useEffect(() => {
    const currWeek = props.weeks.find((w) => isDateInWeek(date, w.startDate));
    setCurrentWeek(currWeek);
  }, [props.weeks, date]);

  function handleShiftClick(shift: Shift): void {
    setCurrentShift(shift);
    setScheduleFormOpen(true);
  }

  function handleWeekCalculate() {
    weeksService.calculate(currentWeek);
  }

  return (
    <div className="CalendarArea">
      <button>חשב</button>
      <Table style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell className="leftDivider" />
            {weekDays.map((day) => (
              <TableCell align="center" key={day.format()}>
                {day.format("dd DD/MM")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {currentWeek && (
          <TableBody>
            {currentWeek.type.requiredShifts.map((shiftType) => (
              <CalendarRow
                key={shiftType.id}
                shiftType={shiftType}
                shifts={currentWeek.shifts.filter(
                  (shift) => shift.type.id === shiftType.id
                )}
                weekDays={weekDays}
                onShiftClick={handleShiftClick}
              />
              // <TableRow key={shiftType.id}>
              //   <TableCell variant="head" align="center" className="leftDivider">
              //     {shiftType.name}
              //     <br />
              //     {moment().hour(shiftType.startHour).format("hh:MM")} -{" "}
              //     {moment()
              //       .hour(shiftType.startHour)
              //       .add(shiftType.duration, "h")
              //       .format("hh:MM")}
              //   </TableCell>
              //   {}
              // </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <ScheduleForm
        open={scheduleFormOpen}
        setOpen={setScheduleFormOpen}
        initialValues={currentShift}
        clearShift={() => setCurrentShift(undefined)}
      />
    </div>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(CalendarArea);
