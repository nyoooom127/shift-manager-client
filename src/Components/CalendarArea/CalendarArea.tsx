import moment, { Moment } from "moment";
import "moment/locale/he";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import User from "../../Models/User";
import Week from "../../Models/Week";
import { AppState } from "../../Redux/AppState";
import weeksService from "../../Services/WeeksService";
import { getWeekDays, isDateInWeek } from "../../Utils/DateUtils";
import { isAdmin } from "../../Utils/UserUtils";
import "./CalendarArea.css";
import CalendarTable from "./CalendarTable/CalendarTable";
import CalendarTablePrint from "./CalendarTablePrint/CalendarTablePrint";

interface CalendarAreaProps {
  weeks: Week[];
  users: User[];
}

function CalendarArea(props: CalendarAreaProps): JSX.Element {
  const [date, setDate] = useState<Moment>(moment().day(0).startOf("D"));
  const [weekDays, setWeekDays] = useState<Moment[]>(getWeekDays(date));
  const [currentWeek, setCurrentWeek] = useState<Week>();
  // const [currShifts, setCurrShifts] = useState<Shift[]>([]);
  // const [scheduleFormOpen, setScheduleFormOpen] = useState<boolean>(false);
  // const [weekFormOpen, setWeekFormOpen] = useState<boolean>(false);
  // const [currentShift, setCurrentShift] = useState<Shift>();
  const auth = useSelector((appState: AppState) => appState.auth);
  const weekTypes = useSelector((appState: AppState) => appState.weekTypes);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  //   const days = Object.keys([...Array(7)]);
  //   props.weeks;

  useEffect(() => {
    const currWeek = props.weeks.find((w) => isDateInWeek(date, w.startDate));
    // ||
    // (weekTypes && weekTypes.length > 0
    //   ? new Week(weekTypes[0], date)
    //   : undefined);
    setCurrentWeek(currWeek);
  }, [props.weeks, date, weekTypes]);

  useEffect(() => {
    setWeekDays(getWeekDays(date));
  }, [date]);

  // function handleShiftClick(shift: Shift): void {
  //   setCurrentShift(shift);
  //   setScheduleFormOpen(true);
  // }

  async function handleWeekCalculate() {
    setCurrentWeek(await weeksService.calculate(currentWeek));
  }

  async function handleWeekSave() {
    setCurrentWeek(await weeksService.update(currentWeek));
  }

  function handleNextClick() {
    setDate(date.clone().add(7, "day"));
  }

  function handlePrevClick() {
    setDate(date.clone().subtract(7, "day"));
  }

  // function handleCreateWeek() {
  //   setWeekFormOpen(true);
  //   // weeksService.create(new Week())
  // }

  return (
    <div
      className={`CalendarArea${
        isEdit ? " CalendarArea-Edit" : " CalendarArea-View"
      }`}
    >
      <div className="buttons">
        <button onClick={handlePrevClick}>{"<"}</button>
        {isAdmin(auth) ? (
          <>
            <button
              onClick={() => setIsEdit(!isEdit)}
              style={{ marginBottom: "1rem" }}
            >
              {isEdit ? "תצוגת הדפסה" : "תצוגת עריכה"}
            </button>
            {isEdit ? (
              <>
                <button onClick={handleWeekCalculate}>חשב</button>
                <button onClick={handleWeekSave}>שמור</button>
              </>
            ) : (
              <>
                <button onClick={handleWeekSave}>הורד</button>
              </>
            )}
          </>
        ) : (
          <button
              onClick={() => setIsEdit(!isEdit)}
              style={{ marginBottom: "1rem" }}
            >
              החלף תצוגה
            </button>
        )}
        <button onClick={handleNextClick}>{">"}</button>
      </div>
      {isEdit ? (
        <CalendarTable
          isEdit={isEdit}
          currentWeek={currentWeek}
          weekDays={weekDays}
          date={date}
        />
      ) : (
        <CalendarTablePrint
          isEdit={isEdit}
          currentWeek={currentWeek}
          weekDays={weekDays}
          date={date}
        />
      )}
      {/* <Table style={{ tableLayout: "fixed" }}>
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
                  isEdit={props.isEdit}
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
      {!currentWeek && (
        <div className="noWeek">
          <p>לא קיים שבוע</p>
          <button onClick={handleCreateWeek}>צור שבוע</button>
        </div>
      )}
      <ScheduleForm
        open={scheduleFormOpen}
        setOpen={setScheduleFormOpen}
        initialValues={currentShift}
        clearShift={() => setCurrentShift(undefined)}
      />
      <WeekForm
        open={weekFormOpen}
        setOpen={setWeekFormOpen}
        initialValues={new Week(undefined, date)}
      /> */}
    </div>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(CalendarArea);
