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
  // const [date, setDate] = useState<Moment>(moment().day(0).startOf("D"));
  // const [weekDays, setWeekDays] = useState<Moment[]>(getWeekDays(date));
  // const [currentWeek, setCurrentWeek] = useState<Week>();
  // const [currShifts, setCurrShifts] = useState<Shift[]>([]);
  // const [scheduleFormOpen, setScheduleFormOpen] = useState<boolean>(false);
  // const [weekFormOpen, setWeekFormOpen] = useState<boolean>(false);
  // const [currentShift, setCurrentShift] = useState<Shift>();
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

  // function handleShiftClick(shift: Shift): void {
  //   setCurrentShift(shift);
  //   setScheduleFormOpen(true);
  // }

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

  // function handleCreateWeek() {
  //   setWeekFormOpen(true);
  //   // weeksService.create(new Week())
  // }

  if (!currentWeek) {
    return null;
  }

  return (
    <div className={`CalendarTablePrint`}>
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="10%" />
            <TableCell width="10%" />
            {[...currentWeek.type.requiredShifts]
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((shiftType) => (
                <TableCell
                  width="20%"
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
            // <TableRow key={day.format()}>
            //   <TableCell width='10%' align="center" key={day.format()}>
            //     {day.format("dd")}
            //   </TableCell>
            //   <TableCell width='10%' align="center" key={day.format()}>
            //     {day.format("DD")}
            //   </TableCell>
            //   {currentWeek.shifts.filter(shift => isSameDay(shift.startDate, day)).map(shift => (

            //   ))}
            //   {[...currentWeek.type.requiredShifts]
            //   .sort((a, b) => a.displayOrder - b.displayOrder)
            //   .map((shiftType) => (
            //     <>
            //     </>
            //   ))
            //   }
            // </TableRow>
          ))}
          {/* {[...currentWeek.type.requiredShifts]
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
              ))} */}
        </TableBody>
      </Table>
      {!currentWeek && (
        <div className="noWeek">
          <p>לא קיים שבוע</p>
          {/* <button onClick={handleCreateWeek}>צור שבוע</button> */}
        </div>
      )}
      {/* <ScheduleForm
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

export default connect(mapStateToProps)(CalendarTablePrint);
