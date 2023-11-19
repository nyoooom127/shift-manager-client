import { TableCell } from "@mui/material";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import {
  getShiftEndTime,
  getShiftStartTime,
  isShiftTooClose,
  isTwoWeekendsInARow,
} from "../../../Utils/ShiftUtils";
import { getOverlappingTypes, isAdmin } from "../../../Utils/UserUtils";
import "./ShiftCell.css";
import Constraint from "../../../Models/Constraint";
import { isDateInRange } from "../../../Utils/DateUtils";

interface ShiftCellProps {
  shift: Shift;
  users: User[];
  onClickShift: (shift: Shift) => void;
  date: Moment;
  shiftType: ShiftType;
  weekId: string;
  isEdit: boolean;
}

function ShiftCell(props: ShiftCellProps): JSX.Element {
  const [user, setUser] = useState<User>();
  const auth = useSelector((appState: AppState) => appState.auth);

  useEffect(() => {
    setUser(props.users.find((u) => u.id === props.shift?.user));
  }, [props]);

  function handleShiftClick() {
    if (isAdmin(auth) && props.isEdit) {
      props.onClickShift(
        props.shift
          ? props.shift
          : new Shift(props.date, props.shiftType, "", props.weekId)
      );
    }
  }

  function isHaveConstraint(shift: Shift, constraintsToCheck: Constraint[]) {
    return constraintsToCheck.some((constraintToCheck) => {
      return isDateInRange(
        constraintToCheck.startDate,
        constraintToCheck.endDate,
        getShiftStartTime(shift.type.startHour, shift.startDate),
        getShiftEndTime(
          shift.type.startHour,
          shift.type.duration,
          shift.startDate
        )
      );
    });
  }

  return (
    <TableCell
      className={
        "ShiftCell" +
        (isAdmin(auth) && props.isEdit ? " editable" : "") +
        (isAdmin(auth) && user && props.isEdit &&
          props.shift &&
          (isTwoWeekendsInARow(props.shift, user.shifts)
            ? " TwoWeekendInRow"
            : "") +
            (isHaveConstraint(props.shift, user.constraints)
              ? " HasConstraint"
              : "") +
            (isShiftTooClose(props.shift, user.shifts) ? " TooClose" : ""))
      }
      align="center"
      onClick={handleShiftClick}
    >
      <div
        style={{
          backgroundColor: isAdmin(auth) && user && props.isEdit
            ? getOverlappingTypes(user?.types, props.shiftType)[0].color
            : undefined,
        }}
        className="username"
      >
        {user?.fullName}
      </div>
    </TableCell>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(ShiftCell);
