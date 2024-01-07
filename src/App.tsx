import "./App.css";

import Box from "@mui/material/Box";
import * as React from "react";
import Content from "./Components/LayoutArea/Content/Content";
import HeaderBar from "./Components/LayoutArea/HeaderBar/HeaderBar";
import Sidebar from "./Components/LayoutArea/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { AppState } from "./Redux/AppState";
import Login from "./Components/AuthArea/Login/Login";

function App() {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const auth = useSelector((appState: AppState) => appState.auth);

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
        <Login/>
      )}
    </Box>
  );
}

export default App;
