import moment from "moment";
import { useSelector } from "react-redux";
import EventModel from "../../../Models/EventModel";
import ShiftModel from "../../../Models/ShiftModel";
import ShiftTypeModel from "../../../Models/ShiftTypeModel";
import { AppState } from "../../../Redux/Slices/AppState";
import Calendar from "../../CalendarArea/Calender/Calender";
import "./Home.css";
moment.locale("he");

export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const defaultType: ShiftTypeModel = {
  name: "אינטגרציה",
  id: "INTEGRATION",
  numDays: 5,
  color: "#8fc5d7",
};

function Home(): JSX.Element {
  const allWeeks = useSelector((appState: AppState) => appState.weeks);
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );

  function getBgColor(shift: ShiftModel, type: ShiftTypeModel): string {
    if (shift.user) {
      return type.color;
    }

    return `repeating-linear-gradient(
          -45deg,
          ${type.color},
          ${type.color} 10px,
          #fff 10px,
          #fff 20px
        )`;
  }
  const items: EventModel[] = allWeeks.flatMap((week) =>
    week.shifts
      // .filter(shift => shift.user)
      .map((shift, index) => {
        const type =
          allShiftTypes.find((t) => t.id === shift.type) || defaultType;

        return {
          id: index,
          start: moment(shift.dateInMillis)
            .startOf("D")
            .format(DATETIME_FORMAT),
          end: moment(shift.dateInMillis)
            .add((type.numDays || 1) - 1, "days")
            .endOf("D")
            .format(DATETIME_FORMAT),
          resourceId: shift.type,
          title: shift.user?.fullName || "",
          bgColor: type.color, //getBgColor(shift, type),
          groupName: type.name,
          groupId: type.id,
          // itemProps: {
          //   // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
          //   "data-custom-attribute": "Random content",
          //   "aria-hidden": true,
          //   onDoubleClick: () => {
          //     console.log("You clicked double!");
          //   },
          //   // className: "weekend",
          //   style: {
          //     background: type?.color,
          //     borderRadius: "5px",
          //     border: "1px solid",
          //     boxSizing: "border-box",
          //   },
          // },
        };
      })
  );

  return (
    <div className="Home">
      <Calendar
        shifts={items}
        types={allShiftTypes}
        // shifts={DemoData.events} types={DemoData.resources}
      />
    </div>
  );
}

export default Home;
