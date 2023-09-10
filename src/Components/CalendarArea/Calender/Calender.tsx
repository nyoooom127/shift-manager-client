import "antd/lib/style/index.less";
import "moment/locale/he";
import { useState } from "react";
import Scheduler, {
  CellUnits,
  SchedulerData,
  ViewTypes,
} from "react-big-scheduler";
import EventModel from "../../../Models/EventModel";
import ShiftTypeModel from "../../../Models/ShiftTypeModel";
import withDragDropContext from "./withDnDContext";

interface CalendarProps {
  shifts: EventModel[];
  types: ShiftTypeModel[];
}

function Calendar(props: CalendarProps): JSX.Element {
  //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
  const [schedulerData, setSchedulerData] = useState<SchedulerData>(
    new SchedulerData(
      "2023-09-03",
      ViewTypes.Week,
      false,
      true,
      {
        schedulerWidth: "75%",
        creatable: false,
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
  schedulerData.setResources(props.types);
  schedulerData.setEvents(props.shifts);

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
      background = `repeating-linear-gradient(
        -45deg,
        ${bgColor},
        ${bgColor} 10px,
        #fff 10px,
        #fff 20px
      )`;
      borderWidth = "2";
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
    schedulerData.prev();
    schedulerData.setEvents(props.shifts);
    setSchedulerData(schedulerData);
  };

  const nextClick = (schedulerData: SchedulerData): void => {
    schedulerData.next();
    schedulerData.setEvents(props.shifts);
    setSchedulerData(schedulerData);
  };

  const onViewChange = (schedulerData: SchedulerData, view: any): void => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(props.shifts);
    setSchedulerData(schedulerData);
  };

  const onSelectDate = (schedulerData: SchedulerData, date: string): void => {
    schedulerData.setDate(date);
    schedulerData.setEvents(props.shifts);
    setSchedulerData(schedulerData);
  };

  const eventClicked = (schedulerData: SchedulerData, event: any): void => {
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
  //       schedulerData.setEvents(props.shifts);
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
  //       schedulerData.setEvents(props.shifts);
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
      eventItemTemplateResolver={eventItemTemplateResolver}
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
