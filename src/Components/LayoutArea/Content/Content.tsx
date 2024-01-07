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
      .getAll()
      .catch((err) => console.log(err.message));
    usersService.getAll().catch((err) => console.log(err.message));
    weekTypesService.getAll().catch((err) => console.log(err));
    userTypesService.getAll().catch((err) => console.log(err));
    constraintTypesService
      .getAll()
      .catch((err) => console.log(err));
    constraintsService.getAll().catch((err) => console.log(err));
    shiftsService.getAll().catch((err) => console.log(err));
  }, []);

  return (
    <div className="Content">
      <Routing />
    </div>
  );
}

export default Content;
