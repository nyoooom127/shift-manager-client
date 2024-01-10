import "./App.css";

import Box from "@mui/material/Box";
import * as React from "react";
import Content from "./Components/LayoutArea/Content/Content";
import HeaderBar from "./Components/LayoutArea/HeaderBar/HeaderBar";
import Sidebar from "./Components/LayoutArea/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { AppState } from "./Redux/AppState";
import Login from "./Components/AuthArea/Login/Login";
import { useEffect } from "react";
import constraintTypesService from "./Services/ConstraintTypesService";
import constraintsService from "./Services/ConstraintsService";
import shiftTypesService from "./Services/ShiftTypesService";
import usersService from "./Services/UsersService";
import weekTypesService from "./Services/WeekTypesService";
import weeksService from "./Services/WeeksService";
// import shiftsService from "./Services/ShiftsService";
import userTypesService from "./Services/UserTypesService";

function App() {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const auth = useSelector((appState: AppState) => appState.auth);
  let running = false;

  useEffect(() => {
    if (auth && !running) {
      running = true;
      weeksService.getAll().catch((err) => console.log(err.message));
      shiftTypesService.getAll().catch((err) => console.log(err.message));
      usersService.getAll().catch((err) => console.log(err.message));
      weekTypesService.getAll().catch((err) => console.log(err));
      userTypesService.getAll().catch((err) => console.log(err));
      constraintTypesService.getAll().catch((err) => console.log(err));
      // constraintsService.getAll().catch((err) => console.log(err));
      // shiftsService.getAll().catch((err) => console.log(err));
    }
  }, [auth]);

  return (
    <Box sx={{ display: "flex" }} className="App">
      <HeaderBar open={sideBarOpen} setOpen={setSideBarOpen} />
      {auth ? (
        <>
          <Sidebar open={sideBarOpen} setOpen={setSideBarOpen} />
          {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
          <Content />
          {/* </Box> */}
        </>
      ) : (
        <Login />
      )}
    </Box>
  );
}

export default App;
