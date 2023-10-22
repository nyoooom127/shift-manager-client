import { Card, CardContent, Table } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import { AppState } from "../../../Redux/AppState";
import "./ShiftArea.css";

function ShiftArea(): JSX.Element {
  const user = useSelector((appState: AppState) => appState.currentUser);
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
                {/* <th className="flex4">הערה</th>
                <th className="flex1">ערוך</th> */}
              </tr>
            </thead>
            <tbody>
              {shifts
                .sort(
                  (a, b) =>
                    moment(a.startDate).unix() - moment(b.startDate).unix()
                )
                .map((shift) => (
                  <tr>
                    <td className="flex2">{shift.type.name}</td>
                    <td className="flex3">
                      {moment(shift.startDate)
                        .startOf("day")
                        .hour(shift.type.startHour)
                        //   .add(shift.type.duration, "h")
                        .format("lll")}
                    </td>
                    <td className="flex3">
                      {moment(shift.startDate)
                        .startOf("day")
                        .hour(shift.type.startHour)
                        .add(shift.type.duration, "h")
                        .format("lll")}
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
