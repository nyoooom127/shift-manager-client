import moment from "moment";
import { useEffect } from "react";
import shiftTypesService from "../../../Services/ShiftTypesService";
import weeksService from "../../../Services/WeeksService";
import Routing from "../Routing/Routing";
import "./Content.css";
moment.locale("he");

function Content(): JSX.Element {
  useEffect(() => {
    weeksService.getAllWeeks().catch((err) => alert(err.message));
    shiftTypesService.getAllShiftTypes().catch((err) => alert(err.message));
  }, []);

  return (
    <div className="Content">
      <Routing />
    </div>
  );
}

export default Content;
