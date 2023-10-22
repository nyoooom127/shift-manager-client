import moment from "moment";
import { useSelector } from "react-redux";
import EventModel from "../../../Models/EventModel";
import Shift from "../../../Models/Shift";
import ShiftType from "../../../Models/ShiftType";
import { AppState } from "../../../Redux/AppState";
import Calendar from "../../CalendarArea/Calendar/Calendar";
import "./Home.css";
import ScheduleForm from "../../SchedulerArea/ScheduleForm/ScheduleForm";
import CalendarTable from "../../CalendarArea/CalendarTable/CalendarTable";
moment.locale("he");

export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const colors = {
  "f5c71c9b-c4b4-4c7a-b06f-de4ab77bbff9": "#E6A5A4",
  "737625f1-057f-424e-a01d-dea218e77738": "#E7B4CC",
  "f41c3de1-1f9e-43ce-9c0e-14110e25b7ec": "#B0E4B8",
  "818d222b-a312-415d-b8c2-9d097e49cc9d": "#8fc5d7",
  tttt: "#ffb8a3",
};
// const defaultType: ShiftType = {
//   name: "אינטגרציה",
//   id: "INTEGRATION",
//   numDays: 5,
//   color: "#8fc5d7",
// };

function Home(): JSX.Element {
  const allWeeks = useSelector((appState: AppState) => appState.weeks);
  const allShiftTypes = useSelector(
    (appState: AppState) => appState.shiftTypes
  );
  const allUsers = useSelector((appState: AppState) => appState.users);

  // function getBgColor(shift: Shift, type: ShiftType): string {
  //   if (shift.user) {
  //     return type.color;
  //   }

  //   return `repeating-linear-gradient(
  //         -45deg,
  //         ${type.color},
  //         ${type.color} 10px,
  //         #fff 10px,
  //         #fff 20px
  //       )`;
  // }
  // const items: EventModel[] = allWeeks.flatMap((week) =>
  //   week.shifts
  //     // .filter(shift => shift.user)
  //     .map((shift, index) => {
  //       const type = allShiftTypes.find((t) => t.id === shift.type.id);
  //       const user = allUsers.find((u) => u.id === shift.user);

  //       return {
  //         id: index,
  //         start: moment(shift.startDate)
  //           .hour(type.startHour)
  //           // .startOf("D")
  //           .format(DATETIME_FORMAT),
  //         end: moment(shift.startDate)
  //           .add(type.duration, "hours")
  //           // .add((type.numDays || 1) - 1, "days")
  //           // .hour(12)
  //           // .endOf("D")
  //           .format(DATETIME_FORMAT),
  //         resourceId: type.id,
  //         title: user?.fullName || "",
  //         bgColor: colors[type.id as keyof typeof colors], //getBgColor(shift, type),
  //         groupName: type.name,
  //         groupId: type.id,
  //         // itemProps: {
  //         //   // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
  //         //   "data-custom-attribute": "Random content",
  //         //   "aria-hidden": true,
  //         //   onDoubleClick: () => {
  //         //     console.log("You clicked double!");
  //         //   },
  //         //   // className: "weekend",
  //         //   style: {
  //         //     background: type?.color,
  //         //     borderRadius: "5px",
  //         //     border: "1px solid",
  //         //     boxSizing: "border-box",
  //         //   },
  //         // },
  //       };
  //     })
  // );

  return (
    <div className="Home">
      {/* <ScheduleForm open={true}/> */}
      <CalendarTable/>
      {/* <Calendar
        shifts={items}
        types={allShiftTypes}
        // shifts={DemoData.events} types={DemoData.resources}
      /> */}
    </div>
  );
}

export default Home;
