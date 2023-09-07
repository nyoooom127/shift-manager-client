import shiftDemoTypes from "../../../demo/types.json";
import weekDemoData from "../../../demo/week.json";
import { week } from "../../../model";
import Calender from "../../Calender/Calender";
import "./Content.css";

function Content(): JSX.Element {
  return (
    <div className="Content">
      <Calender shifts={(weekDemoData as week).shifts} types={shiftDemoTypes} />
    </div>
  );
}

export default Content;
