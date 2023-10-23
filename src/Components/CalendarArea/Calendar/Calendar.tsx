import "antd/lib/style/index.less";
import moment, { Moment } from "moment";
import "moment/locale/he";
import { useEffect, useState } from "react";
import Scheduler, {
  CellUnits,
  Event,
  SchedulerData,
  ViewTypes,
} from "react-big-scheduler";
import { useSelector } from "react-redux";
import EventModel from "../../../Models/EventModel";
import ShiftType from "../../../Models/ShiftType";
import { AppState } from "../../../Redux/AppState";
import withDragDropContext from "./withDnDContext";
import Week from "../../../Models/Week";
import { isDateInWeek } from "../../../Utils/DateUtils";
import CalendarEvent from "../CalendarEvent/CalendarEvent";

export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";
const colors = {
  "f5c71c9b-c4b4-4c7a-b06f-de4ab77bbff9": "#E6A5A4",
  "737625f1-057f-424e-a01d-dea218e77738": "#E7B4CC",
  "f41c3de1-1f9e-43ce-9c0e-14110e25b7ec": "#B0E4B8",
  "818d222b-a312-415d-b8c2-9d097e49cc9d": "#8fc5d7",
  tttt: "#ffb8a3",
};

interface CalendarProps {
  shifts: EventModel[];
  types: ShiftType[];
}

function Calendar(props: CalendarProps): JSX.Element {
  const weeks = useSelector((appState: AppState) => appState.weeks);
  const allUsers = useSelector((appState: AppState) => appState.users);
  const [date, setDate] = useState<Moment>(moment());
  const [currentWeek, setCurrentWeek] = useState<Week>();
  const [currShifts, setCurrShifts] = useState<EventModel[]>([]);

  useEffect(() => {
    const currWeek = weeks.find((w) => isDateInWeek(date, w.startDate));
    setCurrentWeek(currWeek);
  }, [weeks, date]);

  useEffect(() => {
    const items: EventModel[] = currentWeek?.shifts
      // .filter(shift => shift.user)
      .map((shift, index) => {
        const type = shift.type;
        const user = allUsers.find((u) => u.id === shift.user);

        return {
          id: index,
          start: moment(shift.startDate)
            .hour(type.startHour)
            // .startOf("D")
            .format(DATETIME_FORMAT),
          end: moment(shift.startDate)
            .hour(type.startHour)
            .add(type.duration, "hours")
            // .add((type.numDays || 1) - 1, "days")
            // .hour(12)
            // .endOf("D")
            .format(DATETIME_FORMAT),
          resourceId: type.id,
          title: user?.fullName || "",
          bgColor: colors[type.id as keyof typeof colors], //getBgColor(shift, type),
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
      });
    setCurrShifts(items);
    // );
  }, [currentWeek, allUsers]);

  //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
  const [schedulerData, setSchedulerData] = useState<SchedulerData>(
    new SchedulerData(
      date.format(DATE_FORMAT),
      ViewTypes.Week,
      false,
      true,
      {
        schedulerWidth: "75%",
        creatable: true,
        movable: false,
        endResizable: false,
        startResizable: false,
        views: [
          // {
          //   viewName: "",
          //   viewType: ViewTypes.Week,
          //   showAgenda: false,
          //   isEventPerspective: true,
          // },
        ],
      },
      {
        isNonWorkingTimeFunc: (schedulerData: SchedulerData, time: string) => {
          const { localeMoment } = schedulerData;
          if (schedulerData.cellUnit === CellUnits.Hour) {
            let hour = localeMoment(time).hour();
            if (hour < 9 || hour > 18) return true;
          } else {
            let dayOfWeek = localeMoment(time).weekday();
            if (dayOfWeek === 5 || dayOfWeek === 6) return true;
          }

          return false;
        },
      }
    )
    // new SchedulerData("2017-12-18", ViewTypes.Week, false, false)
  );
  schedulerData.localeMoment("").locale("he");
  // schedulerData.setResources(currentWeek?.type.requiredShifts);
  // schedulerData.setEvents(currShifts);

  useEffect(() => {
    schedulerData.setResources(currentWeek?.type.requiredShifts || []);
    schedulerData.setEvents(currShifts || []);
    schedulerData.setDate(date.format(DATE_FORMAT));
    setSchedulerData(schedulerData);
  }, [currentWeek, currShifts, schedulerData, date]);

  const eventItemTemplateResolver = (
    schedulerData: SchedulerData,
    event: any,
    bgColor: string,
    isStart: boolean,
    isEnd: boolean,
    mustAddCssClass: string,
    mustBeHeight: number,
    agendaMaxEventWidth: number
  ) => {
    let borderWidth = "0";
    let borderColor = bgColor,
      background = bgColor;
    let titleText = event.title;

    if (!titleText) {
      // background = `repeating-linear-gradient(
      //   -45deg,
      //   ${bgColor},
      //   ${bgColor} 10px,
      //   #fff 10px,
      //   #fff 20px
      // )`;
      // borderWidth = "2";

      return (
        <div key={event.id} style={{ height: mustBeHeight, width: "100%" }} />
      );
    }

    let divStyle: React.CSSProperties = {
      borderLeft: borderWidth + "px solid " + borderColor,
      border: `${borderWidth}px solid ${borderColor}`,
      borderColor: borderColor,
      background: background,
      height: mustBeHeight,
      lineHeight: mustBeHeight + "px",
      fontSize: "15px",
    };

    return (
      <div
        key={event.id}
        className={`${mustAddCssClass} round-all`}
        style={divStyle}
      >
        <span style={{ marginLeft: "4px", lineHeight: `${mustBeHeight}px` }}>
          {titleText}
        </span>
      </div>
    );
  };

  const prevClick = (schedulerData: SchedulerData): void => {
    setDate(date.subtract(1, "w"));
    // schedulerData.prev();
    // schedulerData.setEvents(currShifts);
    // setSchedulerData(schedulerData);
  };

  const nextClick = (schedulerData: SchedulerData): void => {
    setDate(date.add(1, "w"));
    // schedulerData.next();
    // schedulerData.setEvents(currShifts);
    // setSchedulerData(schedulerData);
  };

  const onViewChange = (schedulerData: SchedulerData, view: any): void => {
    // schedulerData.setViewType(
    //   view.viewType,
    //   view.showAgenda,
    //   view.isEventPerspective
    // );
    // schedulerData.setEvents(currShifts);
    // setSchedulerData(schedulerData);
  };

  const onSelectDate = (schedulerData: SchedulerData, date: string): void => {
    schedulerData.setDate(date);
    // schedulerData.setEvents(currShifts);
    setSchedulerData(schedulerData);
  };

  const eventClicked = (schedulerData: SchedulerData, event: Event): void => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  //   const ops1 = (schedulerData: SchedulerData, event: Event): void => {
  //     alert(
  //       `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
  //     );
  //   };

  //   const ops2 = (schedulerData: SchedulerData, event: Event): void => {
  //     alert(
  //       `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
  //     );
  //   };

  //   const newEvent = (
  //     schedulerData: SchedulerData,
  //     slotId,
  //     slotName,
  //     start,
  //     end,
  //     type,
  //     item
  //   ): void => {
  //     if (
  //       confirm(
  //         `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
  //       )
  //     ) {
  //       let newFreshId = 0;
  //       schedulerData.events.forEach((item) => {
  //         if (item.id >= newFreshId) newFreshId = item.id + 1;
  //       });

  //       let newEvent = {
  //         id: newFreshId,
  //         title: "New event you just created",
  //         start: start,
  //         end: end,
  //         resourceId: slotId,
  //         bgColor: "purple",
  //       };
  //       schedulerData.addEvent(newEvent);
  //       setSchedulerData(schedulerData);
  //     }
  //   };

  //   const updateEventStart = (
  //     schedulerData: SchedulerData,
  //     event,
  //     newStart
  //   ): void => {
  //     if (
  //       confirm(
  //         `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
  //       )
  //     ) {
  //       schedulerData.updateEventStart(event, newStart);
  //     }
  //     setSchedulerData(schedulerData);
  //   };

  //   const updateEventEnd = (
  //     schedulerData: SchedulerData,
  //     event,
  //     newEnd
  //   ): void => {
  //     if (
  //       confirm(
  //         `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
  //       )
  //     ) {
  //       schedulerData.updateEventEnd(event, newEnd);
  //     }
  //     setSchedulerData(schedulerData);
  //   };

  //   const moveEvent = (
  //     schedulerData: SchedulerData,
  //     event,
  //     slotId,
  //     slotName,
  //     start,
  //     end
  //   ): void => {
  //     if (
  //       confirm(
  //         `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
  //       )
  //     ) {
  //       schedulerData.moveEvent(event, slotId, slotName, start, end);
  //       setSchedulerData(schedulerData);
  //     }
  //   };

  //   const onScrollRight = (
  //     schedulerData: SchedulerData,
  //     schedulerContent,
  //     maxScrollLeft
  //   ): void => {
  //     if (schedulerData.ViewTypes === ViewTypes.Day) {
  //       schedulerData.next();
  //       schedulerData.setEvents(currshifts);
  //       setSchedulerData(schedulerData);

  //       schedulerContent.scrollLeft = maxScrollLeft - 10;
  //     }
  //   };

  //   const onScrollLeft = (
  //     schedulerData: SchedulerData,
  //     schedulerContent,
  //     maxScrollLeft
  //   ): void => {
  //     if (schedulerData.ViewTypes === ViewTypes.Day) {
  //       schedulerData.prev();
  //       schedulerData.setEvents(currshifts);
  //       setSchedulerData(schedulerData);

  //       schedulerContent.scrollLeft = 10;
  //     }
  //   };

  //   const onScrollTop = (
  //     schedulerData: SchedulerData,
  //     schedulerContent,
  //     maxScrollTop
  //   ): void => {
  //     console.log("onScrollTop");
  //   };

  //   const onScrollBottom = (
  //     schedulerData: SchedulerData,
  //     schedulerContent,
  //     maxScrollTop
  //   ): void => {
  //     console.log("onScrollBottom");
  //   };

  //   const toggleExpandFunc = (schedulerData: SchedulerData, slotId): void => {
  //     schedulerData.toggleExpandStatus(slotId);
  //     setSchedulerData(schedulerData);
  //   };

  return (
    // <DndProvider backend={HTML5Backend}>

    <Scheduler
      schedulerData={schedulerData}
      prevClick={prevClick}
      nextClick={nextClick}
      onSelectDate={onSelectDate}
      onViewChange={onViewChange}
      eventItemClick={eventClicked}
      eventItemTemplateResolver={CalendarEvent}
      //   viewEventClick={ops1}
      //   viewEventText="Ops 1"
      //   viewEvent2Text="Ops 2"
      //   viewEvent2Click={ops2}
      //   updateEventStart={updateEventStart}
      //   updateEventEnd={updateEventEnd}
      //   moveEvent={moveEvent}
      //   newEvent={newEvent}
      //   onScrollLeft={onScrollLeft}
      //   onScrollRight={onScrollRight}
      //   onScrollTop={onScrollTop}
      //   onScrollBottom={onScrollBottom}
      //   toggleExpandFunc={toggleExpandFunc}
    />
    //   </DndProvider>
  );
}

export default withDragDropContext(Calendar);
