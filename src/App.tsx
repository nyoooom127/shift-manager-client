import "./App.css";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Components/AuthArea/Login/Login";
import Content from "./Components/LayoutArea/Content/Content";
import HeaderBar from "./Components/LayoutArea/HeaderBar/HeaderBar";
import Sidebar from "./Components/LayoutArea/Sidebar/Sidebar";
import { AppState } from "./Redux/AppState";
import constraintTypesService from "./Services/ConstraintTypesService";
import shiftTypesService from "./Services/ShiftTypesService";
import userTypesService from "./Services/UserTypesService";
import usersService from "./Services/UsersService";
import weekTypesService from "./Services/WeekTypesService";
import weeksService from "./Services/WeeksService";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const auth = useSelector((appState: AppState) => appState.auth);
  const running = useRef(false);

  useEffect(() => {
    if (auth && !running.current) {
      weeksService.getAll().catch((err) => console.log(err.message));
      shiftTypesService.getAll().catch((err) => console.log(err.message));
      usersService.getAll().catch((err) => console.log(err.message));
      weekTypesService.getAll().catch((err) => console.log(err));
      userTypesService.getAll().catch((err) => console.log(err));
      constraintTypesService.getAll().catch((err) => console.log(err));
      running.current = true;
    }
  }, [auth]);

  return (
    <Box sx={{ display: "flex" }} className="App">
      <HeaderBar open={sideBarOpen} setOpen={setSideBarOpen} />
      {auth ? (
        <>
          <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
          <Content />
        </>
      ) : (
        <Login />
      )}
    </Box>
  );
}

export default App;
