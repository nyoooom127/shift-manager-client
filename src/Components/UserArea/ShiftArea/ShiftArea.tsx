import { Card, CardContent, Table } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import { isWeekend } from "../../../Utils/DateUtils";
import "./ShiftArea.css";

interface ShiftAreaProps {
  user: User;
}

function ShiftArea({ user }: ShiftAreaProps): JSX.Element {
  const allShifts = useSelector((appState: AppState) => appState.shifts);
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    setShifts(
      allShifts.filter((shift) =>
        user.shifts.some((userShift) => userShift.id === shift.id)
      )
    );
  }, [user, allShifts]);

  //   function handleShiftClick(shift: Shift) {
  //     setCurrentShift(shift);
  //     setShiftFormOpen(true);
  //   }

  return (
    <div className="ShiftArea">
      <Card raised={true} className="Card">
        <CardContent>
          <div className="title">
            משמרות
            {/* <IconButton
            size="large"
            className="addButton"
              onClick={() =>
                handleShiftClick(
                  new Shift(undefined, moment(), moment(), user.id, "")
                )
              }
            ><AddIcon/></IconButton> */}
          </div>
          <Table>
            <thead>
              <tr>
                <th className="flex2">סוג משמרת</th>
                <th className="flex3">התחלה</th>
                <th className="flex3">סיום</th>
                <th className="flex1">סוג</th>
                {/* <th className="flex4">הערה</th>
                <th className="flex1">ערוך</th> */}
              </tr>
            </thead>
            <tbody>
              {shifts
                .sort(
                  (a, b) =>
                    moment(b.startDate).unix() - moment(a.startDate).unix()
                )
                .map((shift) => (
                  <tr key={shift.id}>
                    <td className="flex2">{shift.type.name}</td>
                    <td className="flex3">
                      {moment(shift.startDate)
                        .startOf("day")
                        .hour(shift.type.startHour)
                        //   .add(shift.type.duration, "h")
                        .format("dddd, lll")}
                    </td>
                    <td className="flex3">
                      {moment(shift.startDate)
                        .startOf("day")
                        .hour(shift.type.startHour)
                        .add(shift.type.duration, "h")
                        .format("dddd, lll")}
                    </td>
                    <td className="flex1">
                      {isWeekend(shift.startDate)
                        ? 'סופ"ש'
                        : shift.type.isNight
                        ? "לילה"
                        : "רגיל"}
                    </td>
                    {/* <td className="flex4">{shift.comment}</td>
                  <td className="flex1">
                    <IconButton
                      onClick={() => handleShiftClick(shift)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td> */}
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
      {/* <ShiftForm
        open={shiftFormOpen}
        setOpen={() => setShiftFormOpen(false)}
        initialValues={
          currentShift
        }
      /> */}
    </div>
  );
}

export default ShiftArea;
