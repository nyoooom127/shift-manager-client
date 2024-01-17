import moment from "moment";
import Routing from "../Routing/Routing";
import "./Content.css";
moment.locale("he");

function Content(): JSX.Element {
    return (
    <div className="Content">
      <Routing />
    </div>
  );
}

export default Content;
