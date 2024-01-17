import { UUID } from "crypto";
import { Moment } from "moment";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Constraint from "../../../Models/Constraint";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import User from "../../../Models/User";
import { AppState } from "../../../Redux/AppState";
import { isDateInRange } from "../../../Utils/DateUtils";
import {
  getShiftEndTime,
  getShiftStartTime,
  isShiftTooClose,
  isTwoWeekendsInARow,
} from "../../../Utils/ShiftUtils";
import { getOverlappingTypes, isAdmin } from "../../../Utils/UserUtils";

interface StyledShiftCellProps {
  editable?: boolean;
  username?: boolean;
  tooClose?: boolean;
  hasConstraint?: boolean;
  twoWeekendInRow?: boolean;
  currUserShift?: boolean;
}

const StyledShiftCell = styled.td.attrs((props) => ({
  className: "StyledShiftCell " + props.className,
}))<StyledShiftCellProps>`
  text-align: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  display: table-cell;
  vertical-align: inherit;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  padding: 16px;
  color: rgba(0, 0, 0, 0.87);

  &:hover {
    background-color: #e1e1e1e1;
    ${({ editable }) => editable && "cursor: pointer;"}
  }

  ${({ editable, currUserShift }) =>
    !editable && currUserShift && "background-color: palegoldenrod;"}

  > .username {
    border-radius: 11px;
    padding: 6px 6px;
    min-width: 40px;
    text-align: center;
  }

  ${({ twoWeekendInRow }) =>
    twoWeekendInRow &&
    css`
      background: repeating-linear-gradient(
        -45deg,
        #efda50,
        #efda50 10px,
        #fff 10px,
        #fff 20px
      );
    `}

  ${({ tooClose }) =>
    tooClose &&
    css`
      background: repeating-linear-gradient(
        -45deg,
        #ef5350,
        #ef5350 10px,
        #fff 10px,
        #fff 20px
      );
    `}

    ${({ hasConstraint }) =>
    hasConstraint &&
    css`
      background: repeating-linear-gradient(
        -45deg,
        #ef9050,
        #ef9050 10px,
        #fff 10px,
        #fff 20px
      );
    `}
`;

interface ShiftCellProps {
  shift: Shift;
  users: User[];
  onClickShift: (shift: Shift) => void;
  date: Moment;
  shiftType: ShiftType;
  weekId: UUID;
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
    <StyledShiftCell
      editable={isAdmin(auth) && props.isEdit}
      currUserShift={auth?.id === user?.id}
      twoWeekendInRow={
        isAdmin(auth) &&
        user &&
        props.isEdit &&
        props.shift &&
        isTwoWeekendsInARow(props.shift, user.shifts)
      }
      hasConstraint={
        isAdmin(auth) &&
        user &&
        props.isEdit &&
        props.shift &&
        isHaveConstraint(props.shift, user.constraints)
      }
      tooClose={
        isAdmin(auth) &&
        user &&
        props.isEdit &&
        props.shift &&
        isShiftTooClose(props.shift, user.shifts)
      }
      onClick={handleShiftClick}
    >
      <div
        style={{
          backgroundColor:
            isAdmin(auth) && user && props.isEdit
              ? getOverlappingTypes(user?.types, props.shiftType)[0].color
              : undefined,
        }}
        className="username"
      >
        {user?.fullName}
      </div>
    </StyledShiftCell>
  );
}

const mapStateToProps = (appState: AppState) => ({
  weeks: appState.weeks,
  users: appState.users,
});

export default connect(mapStateToProps)(ShiftCell);
