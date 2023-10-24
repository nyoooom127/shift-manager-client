import { TableCell } from "@mui/material";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import { getOverlappingTypes, isAdmin } from "../../../Utils/UserUtils";
import "./ShiftCell.css";

interface ShiftCellProps {
  shift: Shift;
  users: User[];
  onClickShift: (shift: Shift) => void;
  date: Moment;
  shiftType: ShiftType;
}

function ShiftCell(props: ShiftCellProps): JSX.Element {
  const [user, setUser] = useState<User>();
  const auth = useSelector((appState: AppState) => appState.auth);

  useEffect(() => {
    setUser(props.users.find((u) => u.id === props.shift?.user));
  }, [props]);

  function handleShiftClick() {
    if (isAdmin(auth)) {
      props.onClickShift(
        props.shift ? props.shift : new Shift(props.date, props.shiftType, "")
      );
    }
  }

  return (
    <TableCell
      className={"ShiftCell" + (isAdmin(auth) ? " editable" : "")}
      align="center"
      onClick={handleShiftClick}
    >
      <div
        style={{
          backgroundColor: user
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
