import moment from "moment";
import { useEffect } from "react";
import constraintTypesService from "../../../Services/ConstraintTypesService";
import constraintsService from "../../../Services/ConstraintsService";
import shiftTypesService from "../../../Services/ShiftTypesService";
import usersService from "../../../Services/UsersService";
import weekTypesService from "../../../Services/WeekTypesService";
import weeksService from "../../../Services/WeeksService";
import Routing from "../Routing/Routing";
import "./Content.css";
import shiftsService from "../../../Services/ShiftsService";
import userTypesService from "../../../Services/UserTypesService";
moment.locale("he");

function Content(): JSX.Element {
  useEffect(() => {
    weeksService.getAll().catch((err) => console.log(err.message));
    shiftTypesService
      .getAllShiftTypes()
      .catch((err) => console.log(err.message));
    usersService.getAllUsers().catch((err) => console.log(err.message));
    weekTypesService.getAllWeekTypes().catch((err) => console.log(err));
    userTypesService.getAllUserTypes().catch((err) => console.log(err));
    constraintTypesService
      .getAllConstraintTypes()
      .catch((err) => console.log(err));
    constraintsService.getAllConstraints().catch((err) => console.log(err));
    shiftsService.getAllShifts().catch((err) => console.log(err));
  }, []);

  return (
    <div className="Content">
      <Routing />
    </div>
  );
}

export default Content;
