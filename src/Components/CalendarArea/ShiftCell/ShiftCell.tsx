import { TableCell } from "@mui/material";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import "./ShiftCell.css";

interface ShiftCellProps {
  shift: Shift;
  users: User[];
  onClickShift: (shift: Shift) => void;
  date: Moment;
  shiftType: ShiftType;
}

function ShiftCell(props: ShiftCellProps): JSX.Element {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    setUser(
      props.users.find((u) => u.id === props.shift?.user)?.fullName || ""
    );
  }, [props]);

  function handleShiftClick() {
    console.log(props.date);
    props.onClickShift(
      props.shift ? props.shift : new Shift(props.date, props.shiftType, user)
    );
  }

  return (
    <TableCell className="ShiftCell" align="center" onClick={handleShiftClick}>
      {props.users.find((user) => user.id === props.shift?.user)?.fullName}
    </TableCell>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(ShiftCell);
