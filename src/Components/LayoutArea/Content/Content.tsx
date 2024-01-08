import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import constraintTypesService from "../../../Services/ConstraintTypesService";
import constraintsService from "../../../Services/ConstraintsService";
import shiftTypesService from "../../../Services/ShiftTypesService";
import shiftsService from "../../../Services/ShiftsService";
import userTypesService from "../../../Services/UserTypesService";
import usersService from "../../../Services/UsersService";
import weekTypesService from "../../../Services/WeekTypesService";
import weeksService from "../../../Services/WeeksService";
import Routing from "../Routing/Routing";
import "./Content.css";
moment.locale("he");

function Content(): JSX.Element {
  const auth = useSelector((appState: AppState) => appState.auth);
  useEffect(() => {
    weeksService.getAll().catch((err) => console.log(err.message));
    shiftTypesService.getAll().catch((err) => console.log(err.message));
    usersService.getAll().catch((err) => console.log(err.message));
    weekTypesService.getAll().catch((err) => console.log(err));
    userTypesService.getAll().catch((err) => console.log(err));
    constraintTypesService.getAll().catch((err) => console.log(err));
    constraintsService.getAll().catch((err) => console.log(err));
    shiftsService.getAll().catch((err) => console.log(err));
  }, [auth]);

  return (
    <div className="Content">
      <Routing />
    </div>
  );
}

export default Content;
