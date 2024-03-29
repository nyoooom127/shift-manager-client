import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Moment } from "moment";
import "moment/locale/he";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import Week from "../../../Models/Week";
import { AppState } from "../../../Redux/AppState";
import { isAdmin } from "../../../Utils/UserUtils";
import ScheduleForm from "../../SchedulerArea/ScheduleForm/ScheduleForm";
import WeekForm from "../../SchedulerArea/WeekForm/WeekForm";
import CalendarRow from "../CalendarRow/CalendarRow";
import "./CalendarTable.css";

interface CalendarTableProps {
  // weeks: Week[];
  // users: User[];
  isEdit: boolean;
  currentWeek: Week;
  weekDays: Moment[];
  date: Moment;
}

function CalendarTable({
  isEdit,
  currentWeek,
  weekDays,
  date,
}: CalendarTableProps): JSX.Element {
  const auth = useSelector((appState: AppState) => appState.auth);

  // const [date, setDate] = useState<Moment>(moment().day(0).startOf("D"));
  // const [weekDays, setWeekDays] = useState<Moment[]>(getWeekDays(date));
  // const [currentWeek, setCurrentWeek] = useState<Week>();
  // const [currShifts, setCurrShifts] = useState<Shift[]>([]);
  const [scheduleFormOpen, setScheduleFormOpen] = useState<boolean>(false);
  const [weekFormOpen, setWeekFormOpen] = useState<boolean>(false);
  const [currentShift, setCurrentShift] = useState<Shift>();
  // const auth = useSelector((appState: AppState) => appState.auth);
  // const weekTypes = useSelector((appState: AppState) => appState.weekTypes);

  //   const days = Object.keys([...Array(7)]);
  //   props.weeks;

  // useEffect(() => {
  //   const currWeek = props.weeks.find((w) => isDateInWeek(date, w.startDate));
  //   // ||
  //   // (weekTypes && weekTypes.length > 0
  //   //   ? new Week(weekTypes[0], date)
  //   //   : undefined);
  //   setCurrentWeek(currWeek);
  // }, [props.weeks, date, weekTypes]);

  // useEffect(() => {
  //   setWeekDays(getWeekDays(date));
  // }, [date]);

  function handleShiftClick(shift: Shift): void {
    setCurrentShift(shift);
    setScheduleFormOpen(true);
  }

  // async function handleWeekCalculate() {
  //   setCurrentWeek(await weeksService.calculate(currentWeek));
  // }

  // async function handleWeekSave() {
  //   setCurrentWeek(await weeksService.update(currentWeek));
  // }

  // function handleNextClick() {
  //   setDate(date.clone().add(7, "day"));
  // }

  // function handlePrevClick() {
  //   setDate(date.clone().subtract(7, "day"));
  // }

  function handleCreateWeek() {
    setWeekFormOpen(true);
    // weeksService.create(new Week())
  }

  return (
    <div
      className={`CalendarTable ${
        isEdit ? "CalendarTable-Edit" : "CalendarTable-View"
      } ${
        currentWeek && currentWeek.type.requiredShifts.length > 5
          ? "ManyRows"
          : ""
      }`}
    >
      {/* <div className="buttons">
        <button onClick={handlePrevClick}>{"<"}</button>
        {isAdmin(auth) && props.isEdit && (
          <>
            <button onClick={handleWeekCalculate}>חשב</button>
            <button onClick={handleWeekSave}>שמור</button>
          </>
        )}
        <button onClick={handleNextClick}>{">"}</button>
      </div> */}
      <TableContainer style={{ maxHeight: 440 }}>
        <Table style={{ tableLayout: "fixed" }} stickyHeader>
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
              {[...currentWeek.type.requiredShifts]
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((shiftType) => (
                  <CalendarRow
                    key={shiftType.id}
                    shiftType={shiftType}
                    shifts={currentWeek.shifts.filter(
                      (shift) => shift.type.id === shiftType.id
                    )}
                    weekDays={weekDays}
                    onShiftClick={handleShiftClick}
                    weekId={currentWeek.id}
                    isEdit={isEdit}
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
      </TableContainer>
      {!currentWeek && (
        <div className="noWeek">
          <p>לא קיים שבוע</p>
          {isAdmin(auth) && (
            <button onClick={handleCreateWeek}>צור שבוע</button>
          )}
        </div>
      )}
      {scheduleFormOpen && (
        <ScheduleForm
          open={scheduleFormOpen}
          setOpen={setScheduleFormOpen}
          initialValues={currentShift}
          clearShift={() => setCurrentShift(undefined)}
        />
      )}
      {weekFormOpen && (
        <WeekForm
          open={weekFormOpen}
          setOpen={setWeekFormOpen}
          initialValues={new Week(undefined, date)}
        />
      )}
    </div>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(CalendarTable);
