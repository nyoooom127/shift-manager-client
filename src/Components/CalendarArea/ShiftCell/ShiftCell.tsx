import { TableCell } from "@mui/material";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import { isAdmin } from "../../../Utils/AuthUtils";
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
  const auth = useSelector((appState: AppState) => appState.auth);

  useEffect(() => {
    setUser(
      props.users.find((u) => u.id === props.shift?.user)?.fullName || ""
    );
  }, [props]);

  function handleShiftClick() {
    // console.log(props.date);
    if (isAdmin(auth)) {
      props.onClickShift(
        props.shift ? props.shift : new Shift(props.date, props.shiftType, user)
      );
    }
  }

  const colors= {
    "6359d958-fff4-457a-9af8-1eeece01a589": '#ffb8a3',
    "7c46a571-9119-424b-abb4-b046f0095724": "#b0e4b8",
    "8e1c70f4-d249-44f2-b952-aff2406f8903": "#8fc5d7"
  }as {[key: string]: string}

  return (
    <TableCell
      className={"ShiftCell" + (isAdmin(auth) ? " editable" : "")}
      align="center"
      onClick={handleShiftClick}
      >
      <div
      style={{backgroundColor: colors[props.users.find((user) => user.id === props.shift?.user)?.types[0].id]}}
       className="username">
      {props.users.find((user) => user.id === props.shift?.user)?.fullName}
      </div>
    </TableCell>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(ShiftCell);
