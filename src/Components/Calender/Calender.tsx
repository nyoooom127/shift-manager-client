import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineItemBase,
} from "react-calendar-timeline";
import "./Calender.css";
// make sure you include the timeline stylesheet or the timeline will not be styled
import moment from "moment";
import "moment/locale/he";
import "react-calendar-timeline/lib/Timeline.css";
import { shift, shiftType } from "../../model";
import { time } from "console";
moment.locale("he");

interface CalenderProps {
  shifts: shift[];
  types: shiftType[];
}

// const groups = [
//   { id: 1, title: "group 1" },
//   { id: 2, title: "group 2" },
// ];

// const items1 = [
//   {
//     id: 1,
//     group: 1,
//     title: "item 1",
//     start_time: moment(1693688400000).startOf("D"),
//     end_time: moment(1693688400000).endOf("D"),
//   },
//   {
//     id: 2,
//     group: 2,
//     title: "item 2",
//     start_time: moment().add(1, "days").startOf("D"),
//     end_time: moment().add(1, "days").endOf("D"),
//   },
//   {
//     id: 3,
//     group: 1,
//     title: "item 3",
//     start_time: moment().add(2, "days").startOf("D"),
//     end_time: moment().add(3, "days").endOf("D"),
//   },
// ];

function Calender(props: CalenderProps): JSX.Element {
  const items: TimelineItemBase<any>[] = props.shifts.map((shift, index) => {
    const type = props.types.find((t) => t.name === shift.type);

    return {
      id: index,
      start_time: moment(shift.dateInMillis).startOf("D"),
      end_time: moment(shift.dateInMillis)
        .add((type?.numDays || 1) - 1, "days")
        .endOf("D"),
      group: type?.id || 0,
      title: shift.user?.fullName,
      itemProps: {
        // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
        "data-custom-attribute": "Random content",
        "aria-hidden": true,
        onDoubleClick: () => {
          console.log("You clicked double!");
        },
        // className: "weekend",
        style: {
          background: type?.color,
          borderRadius: "5px",
          border: "1px solid",
          boxSizing: "border-box",
        },
      },
    };
  });

  console.log(moment().day(0));

  return (
    <div className="Calender">
      <Timeline
      lineHeight={50}
        canChangeGroup={false}
        canMove={false}
        canResize={false}
        // sidebarWidth={100}
        buffer={1}
        groups={props.types}
        items={items}
        visibleTimeStart={moment().day(0).add(-1, "days")}
        visibleTimeEnd={moment().day(6).add(1, "days")}
        verticalLineClassNamesForTime={(start, end) => {
          const timeStart = moment(start);
          const timeEnd = moment(end);

          return timeStart.day() === 5 ||
            timeStart.day() === 6 ||
            timeEnd.day() === 5 ||
            timeEnd.day() === 6
            ? ["weekend"]
            : ["weekday"];
        }}
      >
        <TimelineHeaders>
          <DateHeader height={60}/>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps({style: {backgroundColor: "white"}})}></div>;
            }}
          </SidebarHeader>
        </TimelineHeaders>
      </Timeline>
    </div>
  );
}

export default Calender;
