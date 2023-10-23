import { SchedulerData } from "react-big-scheduler";
import "./CalendarEvent.css";

interface CalendarEventProps {
	schedulerData: SchedulerData,
    event: any,
    bgColor: string,
    isStart: boolean,
    isEnd: boolean,
    mustAddCssClass: string,
    mustBeHeight: number,
    agendaMaxEventWidth: number
}

function CalendarEvent(schedulerData: SchedulerData,
    event: any,
    bgColor: string,
    isStart: boolean,
    isEnd: boolean,
    mustAddCssClass: string,
    mustBeHeight: number,
    agendaMaxEventWidth: number): JSX.Element {
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
}

export default CalendarEvent;
