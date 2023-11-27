import moment from "moment";
import CalendarArea from "../../CalendarArea/CalendarArea";
import "./Home.css";
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
  return (
    <div className="Home">
      <CalendarArea />
    </div>
  );
}

export default Home;
