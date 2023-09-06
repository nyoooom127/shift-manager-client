import "./App.css";
import weekDemoData from "./demo/week.json";
import shiftDemoTypes from "./demo/types.json";

import Calender from "./Components/Calender/Calender";
import { week } from "./model";

function App() {
  return (
    <div className="App">
      <Calender shifts={(weekDemoData as week).shifts} types={shiftDemoTypes}/>
    </div>
  );
}

export default App;
